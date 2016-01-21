'use strict';

class CrBot {
  constructor(args) {
    this.token = args.token;
    this.name = args.name;
  }

  run() {
    console.log("running....");
  }
}

module.exports = CrBot;
