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
  constructor(args) {
    this.token = args.token;
    this.name = args.name;
    this.app = app;
  }
}

module.exports = CrBot;
