'use strict';

var express = require('express');
var app = express();

app.get("/", function(req, res) {
  res.send("hello world");
});

class CrBot {
  constructor(args) {
    this.token = args.token;
    this.name = args.name;
    this.app = app;
  }
}

module.exports = CrBot;
