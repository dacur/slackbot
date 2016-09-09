'use strict';
const github = require('./api.github');
const slack = require('./api.slack');
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const path = require('path');
const extensionMap = require('./util/extensions.json');
const typeMap = require('./util/type_to_emoji.json');
const sizeMap = require('./util/size.json');
const prEvents = require('./util/prEvents');
const redisAdapter = require('./util/redisAdapter');

class CodeReview {
  constructor(githubResponse, githubPRParams, slackRequest) {
    this.emitter = new EventEmitter();
    this.EMOJI_REVIEWED = 'eyes';
    this.EMOJI_APPROVED = '+1';
    this.DEATH_EVENT = 'killme';
    this.numberOfReviwers = 0;

    if (githubResponse && githubPRParams && slackRequest) {
      this._created = Date.now();
      this._githubPR = githubResponse[0];
      this._githubPRFiles = githubResponse[1];
      this._githubPRParams = githubPRParams;
      this._slackRequest = slackRequest;

      this.pullRequestUrl = this._githubPR.html_url;
      this.channelID = this._slackRequest.channel_id;
      //this.messageIDs added by a later method. this should probably be fixed.
      this._syncRedis();
    }
  }

  static get RESPONSE_STORAGE_KEYS() {
    return ['_githubPREvents', '_githubPRComments', '_githubCommitComments'];
  }

  bootstrapFromStorage(storageData, index) {
    let dataObj = JSON.parse(storageData)
    for (let index in dataObj) {
      this[index] = dataObj[index];
      console.log(index);
    }
    if ( !this.messageIDs || this.messageIDs.length < 1 ) {
      redisAdapter.delete(this.pullRequestUrl);
      return null;
    }
    this._syncRedis();
    setTimeout(() => {
      this.checkGithubActivity();
    },1000*index);

    return this;
  }

  _getLastActionableEvent() {
    // Multiple events can stack up (closed & reopened, for example). The last event wins.
    return (this._githubPREvents || []).reduce( (prev, item) => {
      if (prEvents.isActionableEvent(item.event)) {
        return item.event;
      }
      return prev;
    }, 'none');
  }

  _checkEvents() {
    if ( !this._githubPREvents.reduce ) {
      console.log(CodeReview, this._githubPREvents.length);
      this.pollGithubForComments();
      return;
    }

    let lastActionableEvent = this._getLastActionableEvent();
    let isInactive = prEvents.isInactive(lastActionableEvent);

    if (isInactive) {
      console.log('isInactive: true', this._githubPRParams);
      github.getPRResource(this._githubPRParams)
        .then(githubResponse => {
          console.log('githubResponse -- title:', (githubResponse) ? githubResponse.title : null);
          let merged = githubResponse[0].merged;
          if (merged) {
            // 'merged' is not actualy a PR event. We need to get
            // the PR data again to see if it has been merged.
            lastActionableEvent = 'merged';
          }
          console.log('About to retire');
          this._retireCodeReview(lastActionableEvent);
        });
    } else {
      this.pollGithubForComments();
    }
  }

  _retireCodeReview(itemEvent) {
    console.log('retiring CR:', itemEvent);
    if (this.poll) {
      clearTimeout(this.poll);
      this.poll = null;
    }

    console.log('timeout cleared.', this.pullRequestUrl);
    if (prEvents.emoji(itemEvent)) {
      console.log('Adding reaction', this.pullRequestUrl);
      slack.addReactionToCRMessage(this, prEvents.emoji(itemEvent));
    }
    console.log('Updating CR message', this.pullRequestUrl);
    slack.updateCRMessage(this, itemEvent);

    redisAdapter
      .delete(this.pullRequestUrl)
      .then((msg)=>{
        console.log('Delete from storage: ', msg, this.pullRequestUrl);
        console.log('Emitting killme', this.pullRequestUrl);
        this.emitter.emit(this.DEATH_EVENT, this);
        this.emitter.removeAllListeners(this.DEATH_EVENT);
      })
      .catch((err)=>{
        console.error(CodeReview, 'Error removing from storage', err);
        console.trace();
        this.emitter.emit(this.DEATH_EVENT, this);
        this.emitter.removeAllListeners(this.DEATH_EVENT);
      });
  }

  _doesMatchApprovalEmojis(body) {
    return ['\\+1','\\👍','\\:\\+1\\:','\\:shipit\\:','LGTM'].reduce((output, emoji) => {
      if (body.match(new RegExp(emoji, 'gi'))) {
        return true;
      }
      return output;
    }, false);
  }

  _checkCommented() {
    let context = this;
    if ( !this._githubPRComments.filter && !this._githubCommitComments.filter ) {
      console.log(this._githubPRComments);
      return;
    }

    let filterOutSelfComments = () => {
      let hash = {};
      return (comment) => {
        return true && //This is here for debugging.
          comment.user.login !== this._githubPR.user.login &&
          !(comment.user.login in hash) &&
          (hash[comment.user.login] = 1);
      };
    };



    let nonPosterComments = []
      .concat(this._githubPRComments, this._githubCommitComments)
      .filter(filterOutSelfComments());

    let reviewers = nonPosterComments.map((comment) => {
      return comment.user.login;
    });

    if ( reviewers.length > this.numberOfReviwers ) {
      reviewers.forEach((reviewer, index) => {
        if (index > this.numberOfReviwers-1) {
          slack.addReactionToCRMessage(this, this.EMOJI_REVIEWED);
        }
      });

      let reviewerApproved = this._githubPRComments
        .filter((comment) => (comment.user.login !== this._githubPR.user.login))
        .reduce((output, comment) => {
          console.log(context._doesMatchApprovalEmojis(comment.body), comment.body)
          if (context._doesMatchApprovalEmojis(comment.body)) return true;
          return output;
        }, false);

      if (reviewerApproved) {
        slack.addReactionToCRMessage(this, this.EMOJI_APPROVED);
      }

      this.reviewerApproved = reviewerApproved;
      this.numberOfReviwers = reviewers.length;
    }
  }

  runPollChecks() {
    this._checkCommented();
    this._checkEvents();
    this._syncRedis();
  }

  updateMessageIDs(messageID) {
    this.messageIDs = this.messageIDs || [];
    this.messageIDs.push(messageID);
  }

  _syncRedis() {
    let data = JSON.stringify({
      _created: this._created,
      _githubPR: this._githubPR,
      _githubPRFiles: this._githubPRFiles,
      _githubPRParams: this._githubPRParams,
      _slackRequest: this._slackRequest,
      pullRequestUrl: this.pullRequestUrl,
      messageIDs: this.messageIDs,
      channelID: this.channelID
    });
    redisAdapter.set(this.pullRequestUrl, data);
  }

  assignETAG(prParams, key) {
    if (this[key] && this[key].meta) {
      prParams.headers = {};
      prParams.headers['If-None-Match'] = this[key].meta.etag;
    }
    return prParams;
  }

  checkGithubActivity() {
    let responseStorageKeys = CodeReview.RESPONSE_STORAGE_KEYS;
    let context = this;
    let prParamGroups = responseStorageKeys
      .map(() => {
        return Object.assign({}, context._githubPRParams);
      })
      .map((prParamGroup, index) => {
        return context.assignETAG(prParamGroup, responseStorageKeys[index]);
      });

    github.getPRChanges.apply(github, prParamGroups)
      .then((responses) => {
        if (responses) {
          responses.forEach((response, index) => {
            if (response && response.length || !context[responseStorageKeys[index]]) {
              console.log('new', responseStorageKeys[index], this.pullRequestUrl);
              context[responseStorageKeys[index]] = response;
            }
          });
        }

        this.runPollChecks();
      })
      .catch((err) => {
        console.error(CodeReview, 'Error: github.getPRChanges', err);
        console.trace();
      });
  }

  isActive() {
    return (this._githubPR.state !== 'closed' || !this._githubPR.merged);
  }

  pollGithubForComments() {
    this.poll = setTimeout(() => {
      console.log('Polling for github comments...');
      let now = new Date();
      console.log('Time:' + now.toLocaleString());
      this.checkGithubActivity();
    }, 5000);
  }

  formattedMessage() {
    if(this._formattedMessage) {
      return this._formattedMessage;
    }
    return `${this._typeEmojis()}${this.pullRequestUrl} ${this._sizeEmoji()}`;
  }

  formattedMessagePlusReviews() {
    return `${this.formattedMessage()}    ${this._reviewedEmojis()}`;
  }

  title() {
    return this._githubPR.title;
  }

  authorName() {
    return this._githubPR.user.login;
  }

  body() {
    // convert header markdown tags (#) to bold; slack doesn't support header
    var body = this._githubPR.body;
    if (body) {
      body = body.replace(/(^|\n)#+(.+)/g, '*$2*');
    }
    return body
  }

  authorThumbnail() {
    return this._githubPR.user.avatar_url;
  }

  _sizeEmoji() {
    let emojis;

    var size = (this._githubPR.additions * 2) + this._githubPR.deletions;
    var key = this._roundDownToList(size, Object.keys(sizeMap));
    return sizeMap[key];
  }

  _typeEmojis() {
    const fileExts = this._fileExtensions();
    let emojis = fileExts
      .map((ext) => extensionMap[ext.toLowerCase()])
      .map((type) => typeMap[type])
      .filter(this._uniq())
      .join(' ');

    if(emojis) { emojis = emojis + ' ' }
    return emojis;
  }

  _reviewedEmojis() {
    let out = '';
    if (this.numberOfReviwers) out += ':eyes: ';
    if (this.reviewerApproved) out += ':+1: ';
    return out;
  }

  _fileExtensions() {
    return this._githubPRFiles
      .map((file) => path.extname(file.filename))
      .filter(ext => ext);
  }

  _uniq() {
    const seen = {};
    return (emoji) => !(emoji in seen) && (seen[emoji] = 1);
  }

  // Round the given number up to the nearest item in the list
  _roundDownToList(num, roundList) {
    var currentRound = 0;
    var sortedList = roundList.sort(function(a, b){return a-b});

    for (var i = 0; i < sortedList.length; i++) {
      var compareNumber = sortedList[i];
      if (compareNumber <= num) {
        currentRound = compareNumber;
      } else {
        return currentRound;
      }
    }
    return currentRound;
  }
}

module.exports = CodeReview;
