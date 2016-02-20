'use strict';
const github = require('./api.github');
const slack = require('./api.slack');
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const path = require('path');
const extensionMap = require('./util/extensions.json');
const typeMap = require('./util/type_to_emoji.json');
const sizeMap = require('./util/size.json');

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
  }

  _checkEvents() {
    if ( !this._githubPREvents.reduce ) {
      console.log(this._githubPREvents);
      this.pollGithubForComments();
      return;
    }

    let doClosePoll = this._githubPREvents.reduce((prev, item) => {
      if (item.event.match(/closed|merged|head_ref_deleted/)) {
        return true;
      }
      return prev;
    }, false);

    if (doClosePoll) {
      this._retireCodeReview();
    } else {
      this.pollGithubForComments();
    }
  }

  _retireCodeReview() {
    this.poll && clearTimeout(this.poll);
    slack.deleteCRMessages(this);
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
      this.checkGithubActivity();
    }, 5000);
  }

  formattedMessage() {
    if(this._formattedMessage) { return this._formattedMessage; }

    return `${this._typeEmojis()}${this.pullRequestUrl} ${this._sizeEmoji()}`
  }

  _sizeEmoji() {
    let emojis;

    if (this._githubPR.additions < 50) {
      emojis = sizeMap["small"];
    } else if (this._githubPR.additions < 200) {
      emojis = sizeMap["medium"];
    } else {
      emojis = sizeMap["large"];
    }

    return emojis[Math.floor(Math.random() * emojis.length)];
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
}

module.exports = CodeReview;
