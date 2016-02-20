'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const CodeReview = require('./codeReview');

const app = express();

class CrBot {
  constructor(config) {
    this.config = config;
    this.app = app;
    this.activeReviews = [];
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

  onIncomingCodeReview(req, res, next) {
    let githubPRParams = this.getGitHubPRParams(req.body.text);
    let newCR;
    if (!githubPRParams) { return rs.status(404).end(); }

    return this.getPR(githubPRParams)
      .then(githubResponse => {
        newCR = new CodeReview(githubResponse, githubPRParams, req.body);
        newCR.emitter.once('killme', () => {
          this.removeInactivePullRequest(newCR);
        });

        this.activeReviews.push(newCR);
        return this.activeReviews[this.activeReviews.length-1];
      })
      .then((codeReview) => {
        return this.slack.createCRMessage(codeReview);
      })
      .then(() => {
        res.status(200).send("Pull request submitted");
        return newCR;
      })
      .catch(err => next(err));
  }

  setup() {
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/code_review', this.onIncomingCodeReview.bind(this));

    this.github = require('./api.github');
    this.github.authenticate(this.config);

    this.slack = require('./api.slack');
    this.slack.setup(this.config);
  }

  removeInactivePullRequest(pr) {
    let index = this.activeReviews.indexOf(pr);
    this.activeReviews.splice(index, 1);
  }

  getPR(pullRequestParams) {
    return this.github.getPRResource(pullRequestParams);
  }
}

module.exports = CrBot;
