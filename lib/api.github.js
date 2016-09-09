'use strict';
const request = require('request');

class GitHubAPI {
  constructor() {
    let Api = require('github4');
    this.apiHandle = new Api({
      // required
      version: "3.0.0",
      debug: false,
      protocol: "https",
      timeout: 5000,
      headers: {
        "user-agent": "Code-Review-Bot" // GitHub is happy with a unique user agent
      }
    });
  }

  authenticate(config) {
    if (!this.gitconf && config) {
      this.gitconf = {
        type: "oauth",
        token: config.GITHUB_AUTH
      };
    }
    this.apiHandle.authenticate(this.gitconf);
  }

  _getPRApi(){
    this.authenticate();
    return this.apiHandle.getPullrequestsApi();
  }

  _getAPIPromise(pullRequestParams, apiCategory, apiLocation) {
    return (new Promise((resolve, reject) => {
      let apiLocationHandle = this.apiHandle[apiCategory][apiLocation];
      apiLocationHandle(pullRequestParams, (err, res) => {
        if ( err ) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }));
  }

  getPRChanges(eventPRParams, commentPRParams, commitCommentPRParams) {
    let promises = [
      this._getAPIPromise(eventPRParams, 'issues', 'getEvents'),
      this._getAPIPromise(commentPRParams, 'issues', 'getComments'),
      this._getAPIPromise(commitCommentPRParams, 'pullRequests', 'getComments')
    ];
    return Promise.all(promises).catch((err) => {
      console.error(err, eventPRParams, commentPRParams, commitCommentPRParams);
      console.trace();
    });
  }

  getPRResource(pullRequestParams) {
    let promises = [
      this._getAPIPromise(pullRequestParams, 'pullRequests', 'get'),
      this._getAPIPromise(pullRequestParams, 'pullRequests', 'getFiles')
    ];
    return Promise.all(promises).catch((err) => {
      console.error(err);
      console.trace();
    });
  }
}

module.exports = new GitHubAPI();
