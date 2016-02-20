'use strict';
const Github = require('./api.github');
const Slack = require('./api.slack');
const EventEmitter = require('events').EventEmitter;
const util = require('util');

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

    this.pullRequestUrl = this._githubPR.url;
    this.channelID = this._slackRequest.channel_id;

    this.pollGithubForComments();
  }

  _checkEvents() {
    //Event type to delete slack message on
    //on this._githubPREvents[x].event == 'closed|merged||head_ref_deleted'
    let doClosePoll = this._githubPREvents.reduce((prev, item) => {
      if (item.event.match(/closed|merged|head_ref_deleted/)) {
        return true;
      }
      return prev;
    }, false);

    if (doClosePoll && this.poll) {
      this._retireCodeReview();
    } else {
      this.pollGithubForComments();
    }
  }

  _retireCodeReview() {
    clearTimeout(this.poll);
    Slack.deleteCRMessages(this);
    this.emitter.emit('killme');
  }

  _checkCommented() {
    let reviewers = this._githubPRComments
      .filter(() => {
        let hash = {};
        return (comment) => {
          return comment.user.login !== this._githubPR.user.login && !(comment.user.login in hash) && (hash[comment.user.login] = 1)
        };
      }())
      .map((comment) => {
        return comment.user.login;
      });


    if ( reviewers.length > this.numberOfReviwers ) {
      reviewers.forEach((reviewer, index) => {
        if (index > this.numberOfReviwers-1) {
          Slack.addReactionToCRMessage(this, this.EMOJI_REVIEWED).catch((err) => {
            console.log(err);
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

  pollGithubForComments() {
    this.poll = setTimeout(() => {

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

      Github.getPRChanges(prParamsEvents, prParamsComments)
        .then((responses) => {
          this._githubPREvents = responses[0];
          this._githubPRComments = responses[1];

          this.runPollChecks();
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
  }
}

module.exports = CodeReview;
