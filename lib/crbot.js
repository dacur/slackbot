'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const CodeReview = require('./codeReview');

const app = express();

class CrBot {
  constructor(config) {
    this.config = config;
    this.app = app;
    this.setup();
  }

  getGitHubPRParams(text) {
    let prurl = text.match(/github\.com[a-zA-Z0-9-_/]*/gi);
    if (prurl && prurl.length === 1) {
      let prUrlArray = prurl[0].split('/');
      if (prUrlArray.length === 5) {
        return {
          'user': prUrlArray[1],
          'repo': prUrlArray[2],
          'number' : prUrlArray[4]
        };
      }
      return null;
    }
    return null;
  }

  setup() {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/code_review', (req, res, next) => {
      let githubPRParams = this.getGitHubPRParams(req.body.text);
      if (!githubPRParams) { return rs.status(404).end(); }

      this.getPR(githubPRParams)
        .then(param => new CodeReview(param))
        .then(codeReview => this.slack.createCRMessage(codeReview))
        .then(() => res.status(200).send("Pull request submitted"))
        .catch(err => next(err));
    });

    this.github = require('./api.github');
    this.github.authenticate(this.config);

    let Slack = require('./api.slack');
    this.slack = new Slack(this);
  }

  getPR(pullRequestParams) {
    return this.github.getPRResource(pullRequestParams);
  }
}

module.exports = CrBot;
