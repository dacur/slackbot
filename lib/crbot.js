'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const CodeReview = require('./codeReview');
const redisAdapter = require('./util/redisAdapter');

const app = express();

class CrBot {
  constructor(config) {
    this.config = config;
    this.app = app;
    this.activeReviews = [];
    this.ready = this.setup();
  }

  getGitHubPRParams(text) {
    if (text) {
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
    }
    return null;
  }

  onSlackMessageIsBad(res, req) {
    return res.status(404)
        .end(`Beep:Boop.
          I could not find your repo.
          Are you sure it is accessible to me?
          Please double check your URL: ${req.body.text}`);
  }

  onIncomingCodeReview(req, res, next) {
    let githubPRParams = this.getGitHubPRParams(req.body.text);
    let newCR;
    console.log('Incoming CR -- githubPRParams:', githubPRParams, typeof githubPRParams);
    if (!githubPRParams) {
      console.log('Incoming CR -- SlackMessageIsBad: githubPRParams empty');
      return this.onSlackMessageIsBad(res, req);
    }

    return this.getPR(githubPRParams)
      .then(githubResponse => {
        if (!githubResponse[0]) {
          this.onSlackMessageIsBad(res, req);
          var err = (new Error(`Slack Message Did Not Contain a URL that could be found: ${req.body.text}`));
          throw err;
          return err;
        }

        newCR = new CodeReview(githubResponse, githubPRParams, req.body);
        newCR.emitter.on(newCR.DEATH_EVENT, (deadCR) => {
          this.removeInactivePullRequest(deadCR);
        });

        this.activeReviews.push(newCR);
        return this.activeReviews[this.activeReviews.length-1];
      })
      .then((codeReview) => {
        return this.slack.createCRMessage(codeReview);
      })
      .then(() => {
        newCR.checkGithubActivity();
        res.status(200).send("Pull request submitted");
        return newCR;
      })
      .catch(err => next(err));
  }

  onIncomingPRQueue(req, res, next) {
    let channel_id = req.body.channel_id;
    console.log(CrBot, 'onIncomingPRQueue', this.activeReviews.length);
    let response = this.slack.makeCRQueueMessageData(this.activeReviews.filter((cr) => {
      return !!cr.poll;
    }), channel_id);
    res.status(200).send(response);
  }

  setup() {
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/code_review', this.onIncomingCodeReview.bind(this));
    app.post('/pr_queue', this.onIncomingPRQueue.bind(this));

    this.github = require('./api.github');
    this.github.authenticate(this.config);

    this.slack = require('./api.slack');
    this.slack.setup(this.config);

    return this._loadStoredPRs().then(() => {
      console.log(CrBot, 'Setup Complete');
    });
  }

  _loadStoredPRs() {
    return (redisAdapter
      .getAll('https://github.com/*')
      .then((reply) => {
        this.activeReviews = this.activeReviews.concat(reply.map((crData, index) => {
          let _cr = new CodeReview();
          return _cr.bootstrapFromStorage(crData, index);
        }))
        console.log('\n', this.activeReviews.length, '\n');
      }));
  }

  removeInactivePullRequest(pr) {
    console.log('removeInactivePullRequest');
    let oldLen = this.activeReviews.length;
    let index = this.activeReviews.indexOf(pr);
    let crItem = this.activeReviews.splice(index, 1);
    console.log('Removed PR. PRs left: ', this.activeReviews.length, '/',  oldLen);
  }

  getPR(pullRequestParams) {
    return this.github.getPRResource(pullRequestParams);
  }
}

module.exports = CrBot;
