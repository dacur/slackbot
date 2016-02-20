'use strict';

let request = require('request-promise');

class SlackAPI {
  constructor() {
    this.baseUrl = "https://slack.com/api/";
  }

  setup(config) {
    this.config = config;
  }

  createCRMessage(codeReview) {
    let options = this._requestOptions("chat.postMessage", {
      channel: codeReview.channelID,
      text: this._formatCRMessage(codeReview),
      as_user: true
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      codeReview.messageIDs = codeReview.messageIDs || [];
      codeReview.messageIDs.push(response.ts);
      return codeReview;
    }).catch((err) => {
      console.log(SlackAPI, err);
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
      }).catch((err) => {
        console.log(SlackAPI, err);
      });
    }));
  }

  addReactionToCRMessage(codeReview, name) {
    let options = this._requestOptions("reactions.add", {
      channel: codeReview.channelID,
      timestamp: codeReview.messageIDs[0],
      name: name
    });

    console.log('hi');

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      return codeReview;
    }).catch((err) => {
      console.log(SlackAPI, err);
    });
  }

  repostCR(codeReview) {
    let options = this._requestOptions('chat.postMessage', {
      channel: codeReview.channelID,
      text: this._formatCRRepost(codeReview),
      as_user: true
    });

    return request(options).then((response) => {
      if(!response.ok) { throw new Error(response.error); }
      codeReview.messageIDs = codeReview.messageIDs || [];
      codeReview.messageIDs.push(response.ts);
      return codeReview;
    }).catch((err) => {
      console.log(SlackAPI, err);
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
    return 'Repost';
  }

  _formatCRMessage(codeReview) {
    return codeReview.pullRequestUrl;
  }
}

module.exports = new SlackAPI();
