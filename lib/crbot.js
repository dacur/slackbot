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
      // console.log(req);
      //this.getPR();
      res.end();
    });

    this.github = require('./api.github');
    this.github.authenticate(this.config);
  }
  getPR(pullRequestParams) {
    return this.github.getPR(pullRequestParams);
  }
}

module.exports = CrBot;
