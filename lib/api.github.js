'use strict';
class GitHubAPI {
  constructor() {
    let Api = require('github');
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
        key: config.GITHUB_API_ID,
        secret: config.GITHUB_API_KEY
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

  getPRChanges(eventPRParams, commentPRParams) {
    let promises = [
      this._getAPIPromise(eventPRParams, 'issues', 'getEvents'),
      this._getAPIPromise(commentPRParams, 'issues', 'getComments')
    ];
    return Promise.all(promises);
  }

  getPRResource(pullRequestParams) {
    let promises = [
      this._getAPIPromise(pullRequestParams, 'pullRequests', 'get'),
      this._getAPIPromise(pullRequestParams, 'pullRequests', 'getFiles')
    ];
    return Promise.all(promises);
  }
}

module.exports = new GitHubAPI();
