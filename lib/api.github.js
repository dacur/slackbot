'use strict';
class GitHubAPI {
  constructor() {
    let Api = require('github');
    this.apiHandle = new Api({
      // required
      version: "3.0.0",
      debug: true,
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

  _getAPIPromise(pullRequestParams, apiLocation) {
    return (new Promise((resolve, reject) => {
      let apiLocationHandle = this._getPRApi()[apiLocation];
      apiLocationHandle(pullRequestParams, (err, res) => {
        if ( err ) {
          reject(err);
          return;
        }
        resolve(res);
      });
    }));
  }

  getPRResource(pullRequestParams) {
    let promises = [
      this._getAPIPromise(pullRequestParams, 'get'),
      this._getAPIPromise(pullRequestParams, 'getFiles')
    ];
    return Promise.all(promises);
  }
}

module.exports = new GitHubAPI();
