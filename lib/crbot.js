'use strict';

const express = require('express'),
    bodyParser = require('body-parser');

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

  handleValidPRMessage(githubPRParams, req, res) {
    this.getPR(githubPRParams)
      .then((param) => {
        res.json(param);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  setup() {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/code_review", (req,res) => {
      let githubPRParams = this.getGitHubPRParams(req.body.text);

      if (githubPRParams) {
        this.handleValidPRMessage(githubPRParams, req, res);
      } else {
        res.status(404).end('');
      }
    });

    this.github = require('./api.github');
    this.github.authenticate(this.config);
  }

  getPR(pullRequestParams) {
    return this.github.getPRResource(pullRequestParams);
  }
}

module.exports = CrBot;
