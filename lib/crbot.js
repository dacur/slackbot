'use strict';

const express = require('express'),
    bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/code_review", (req,res) => {
  // console.log(req);
  res.end();
});

class CrBot {
  constructor(config) {
    this.config = config;
    this.app = app;
    this.setupApis();
  }
  setupApis() {
    this.github = require('./api.github');
    this.github.authenticate(this.config);
  }
}

module.exports = CrBot;
