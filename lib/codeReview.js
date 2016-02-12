'use strict';
const Github = require('./api.github');
const EventEmitter = require('events');

class CodeReview extends EventEmitter {
  constructor(githubResponse, slackRequest) {
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    console.log(slackRequest);
    this._slackRequest = slackRequest;

    this.pullRequestUrl = this._githubPR.url;
    this.channelID = this._slackRequest.channel_id;

    console.log('\n\n\n\nPolling!\n\n\n\n', this.pullRequestUrl);

    this.pollGithubForComments();
  }

  pollGithubForComments() {
    console.log('\n\n\n\nPolling!\n\n\n\n', this.pullRequestUrl);
    this.poll = setTimeout(() => {
      Github
    }, 1000);
  }
}

module.exports = CodeReview;
