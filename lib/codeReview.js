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

    this.numberOfReviwers = 0;

    this._created = Date.now();
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    this._githubPRParams = githubPRParams;
    this._slackRequest = slackRequest;

    this.pullRequestUrl = this._githubPR.html_url;
    this.channelID = this._slackRequest.channel_id;
    this._syncRedis();
  }

  _checkEvents() {
    if ( !this._githubPREvents.reduce ) {
      console.log(CodeReview, this.name, this._githubPREvents.length);
      this.pollGithubForComments();
      return;
    }

    // Multiple events can stack up (closed & reopened, for example). The last event wins.
    let lastActionableEvent = this._githubPREvents.reduce( (prev, item) => {
      if (prEvents.isActionableEvent(item.event)) {
        return item.event;
      }
      return prev;
    }, 'none');

    let isInactive = prEvents.isInactive(lastActionableEvent);

    if (isInactive) {
      console.log('isInactive: true');
      github.getPRResource(this._githubPRParams).then(githubResponse => {
        console.log('githubResponse -- title:', (githubResponse) ? githubResponse.title: 'null');
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
    this.poll && clearTimeout(this.poll);

    console.log('timeout cleared.');
    if (prEvents.emoji(itemEvent)) {
      console.log('Adding reaction');
      slack.addReactionToCRMessage(this, prEvents.emoji(itemEvent));
    }
    console.log('Updating CR message');
    slack.updateCRMessage(this, itemEvent);

    console.log('Emitting killme');
    this.emitter.emit('killme');
  }

  _checkCommented() {
    if ( !this._githubPRComments.filter ) {
      console.log(this._githubPRComments);
      return;
    }

    let reviewers = this._githubPRComments
      .filter(() => {
        let hash = {};
        return (comment) => {
          return comment.user.login !== this._githubPR.user.login && !(comment.user.login in hash) && (hash[comment.user.login] = 1);
        };
      }())
      .map((comment) => {
        return comment.user.login;
      });

    if ( reviewers.length > this.numberOfReviwers ) {
      reviewers.forEach((reviewer, index) => {
        if (index > this.numberOfReviwers-1) {
          slack.addReactionToCRMessage(this, this.EMOJI_REVIEWED).catch((err) => {
            console.log(err);
            console.trace();
          });
        }
      })
      this.numberOfReviwers = reviewers.length;
    }
  }

  runPollChecks() {
    this._checkCommented();
    this._checkEvents();
    this._syncRedis();
  }

  _syncRedis() {
    redisAdapter.set(this.pullRequestUrl, JSON.stringify(this));
  }

  checkGithubActivity() {
    var prParamsEvents = Object.assign({}, this._githubPRParams);
    var prParamsComments = Object.assign({}, this._githubPRParams);

    if (this._githubPREvents) {
      prParamsEvents.headers = {};
      prParamsEvents.headers['If-None-Match'] = this._githubPREvents.meta.etag;
    }
    if (this._githubPRComments) {
      prParamsComments.headers = {};
      prParamsComments.headers['If-None-Match'] = this._githubPRComments.meta.etag;
    }

    github.getPRChanges(prParamsEvents, prParamsComments)
      .then((responses) => {
        this._githubPREvents = responses[0];
        this._githubPRComments = responses[1];

        this.runPollChecks();
      })
      .catch((err) => {
        console.log(err);
        console.trace();
      });
  }

  pollGithubForComments() {
    this.poll = setTimeout(() => {
      console.log('Polling for github coments...');
      let now = new Date();
      console.log('Time:' + now.toLocaleString());
      this.checkGithubActivity();
    }, 5000);
  }

  formattedMessage() {
    if(this._formattedMessage) { return this._formattedMessage; }

    return `${this._typeEmojis()}${this.pullRequestUrl} ${this._sizeEmoji()}`
  }

  title() {
    return this._githubPR.title
  }

  authorName() {
    return this._githubPR.user.login
  }

  body() {
    // convert header markdown tags (#) to bold; slack doesn't support header
    var body = this._githubPR.body
    if (body) {
      body = body.replace(/(^|\n)#+(.+)/g, '*$2*')
    }
    return body
  }

  authorThumbnail() {
    return this._githubPR.user.avatar_url
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
