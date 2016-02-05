'use strict';

let request = require('request-promise');

class SlackAPI {
  constructor(bot) {
    this.config = bot.config;
    this.baseUrl = "https://slack.com/api/";
  }

  createCRMessage(codeReview) {
    let options = this.requestOptions("chat.postMessage", {
      channel: codeReview.channelID,
      text: this.formatCRMessage(codeReview),
      as_user: true
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      codeReview.messageID = response.ts;
      return codeReview;
    });
  }

  deleteCRMessage(codeReview) {
    let options = this.requestOptions("chat.delete", {
      channel: codeReview.channelID,
      ts: codeReview.messageID
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      return codeReview;
    });
  }

  addReactionToCRMessage(codeReview, name) {
    let options = this.requestOptions("reactions.add", {
      channel: codeReview.channelID,
      timestamp: codeReview.messageID,
      name: name
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      return codeReview;
    });
  }

  requestOptions(method, qs) {
    let defaults = { token: this.config.SLACK_API_TOKEN };
    let queryString = Object.assign(defaults, qs);

    return {
      uri: `${this.baseUrl}${method}`,
      qs: queryString,
      json: true
    };
  }

  formatCRMessage(codeReview) {
    return "Dummy message for now";
  }
}

module.exports = SlackAPI;
