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
  setup() {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/code_review", (req,res) => {
      this.getPR(req.body)
        .then((param) => {
          console.log('post /code_review', param);
          res.end(param);
        })
        .catch((err) => {
          res.end('err');
        });
    });

    this.github = require('./api.github');
    this.github.authenticate(this.config);
  }
  getPR(pullRequestParams) {
    return this.github.getPRResource(pullRequestParams);
  }
}

module.exports = CrBot;
