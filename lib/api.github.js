'use strict';

class GitHubAPI {
  constructor() {
    let Api = require('node-github');
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
    this.handle.authenticate({
      type: "oauth",
      key: config.GITHUB_API_ID,
      secret: config.GITHUB_API_KEY
    });
  }
}

module.exports = new GitHubAPI();