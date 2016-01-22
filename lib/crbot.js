'use strict';

var express = require('express');
var app = express();

app.get("/", function(req, res) {
  res.send("hello world");
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
