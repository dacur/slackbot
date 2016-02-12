'use strict';
const Github = require('./api.github');

class CodeReview {
  constructor(githubResponse, slackRequest) {
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    console.log(slackRequest);
    this._slackRequest = slackRequest;

    this.pullRequestUrl = this._githubPR.url;
    this.channelID = this._slackRequest.channel_id;

    this.pollGithubForComments();
  }

  pollGithubForComments() {
    this.poll = setTimeout(() => {
      Github
    }, 1000);
  }
}

module.exports = CodeReview
