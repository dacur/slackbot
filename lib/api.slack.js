'use strict';

let request = require('request-promise');

class SlackAPI {
  constructor(bot) {
    this.config = bot.config;
    this.baseUrl = "https://slack.com/api/";
  }

  createCRMessage(codeReview) {
    let options = this._requestOptions("chat.postMessage", {
      channel: codeReview.channelID,
      text: codeReview.formattedMessage(),
      as_user: true
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      codeReview.messageIDs = codeReview.messageIDs || [];
      codeReview.messageIDs.push(response.ts);
      return codeReview;
    });
  }

  deleteCRMessages(codeReview) {
    return Promise.all(codeReview.messageIDs.map(id => {
      let options = this._requestOptions("chat.delete", {
        channel: codeReview.channelID,
        ts: id
      });

      return request(options).then((response) => {
        if(!response.ok) { throw new Error(response.error); }
        return codeReview;
      });
    }));
  }

  addReactionToCRMessage(codeReview, name) {
    let options = this._requestOptions("reactions.add", {
      channel: codeReview.channelID,
      timestamp: codeReview.messageIDs[0],
      name: name
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      return codeReview;
    });
  }

  repostCR(codeReview) {
    let options = this._requestOptions("chat.postMessage", {
      channel: codeReview.channelID,
      text: this._formatCRRepost(codeReview),
      as_user: true
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      codeReview.messageIDs = codeReview.messageIDs || [];
      codeReview.messageIDs.push(response.ts);
      return codeReview;
    });
  }

  _requestOptions(method, qs) {
    let defaults = { token: this.config.SLACK_API_TOKEN };
    let queryString = Object.assign(defaults, qs);

    return {
      uri: `${this.baseUrl}${method}`,
      qs: queryString,
      json: true
    };
  }

  _formatCRRepost(codeReview) {
    return "Repost";
  }

  _formatCRMessage(codeReview) {
    return codeReview.pullRequestUrl;
  }
}

module.exports = SlackAPI;
