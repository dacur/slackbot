'use strict';

class CodeReview {
  constructor(githubResponse) {
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    this.pullRequestUrl = this._githubPR.url;
  }
}

module.exports = CodeReview
