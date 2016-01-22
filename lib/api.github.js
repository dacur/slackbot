'use strict';
class GitHubAPI {
  constructor() {
    let Api = require('github');
    this.handle = new Api({
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
    this.handle.authenticate(this.gitconf);
  }
  getPR( pullRequestParams ) {
    return (new Promise((resolve, reject) => {
      this.authenticate();
      this.handle
        .getPullrequestsApi()
        .get(pullRequestParams, (err, res) => {
          if ( err ) {
            reject(err);
            return;
          }
          resolve(res);
        });
    }));
  }
}

module.exports = new GitHubAPI();