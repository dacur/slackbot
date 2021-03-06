'use strict';

let request = require('request-promise');
let prEvents = require('./util/prEvents');

class SlackAPI {
  constructor() {
    this.baseUrl = "https://slack.com/api/";
  }

  setup(config) {
    this.config = config;
  }

  makeCRMessageData(codeReview, itemEvent) {
    return {
      channel: codeReview.channelID,
      text: codeReview.formattedMessage(),
      as_user: true,
      unfurl_links: false,
      attachments: JSON.stringify([
        {
          color: prEvents.color(itemEvent),
          fallback: codeReview.title(),
          title: codeReview.title(),
          title_link: codeReview.pullRequestUrl,
          text: codeReview.body(),
          author_icon: codeReview.authorThumbnail(),
          author_name: codeReview.authorName(),
          mrkdwn_in: ['text']
        }
      ])
    }
  }

  makeCRQueueMessageData(codeReviews, slackChannelID) {
    let codeReviewLines = codeReviews.reduce((output, currentReview)=> {
        if (currentReview.isActive()) {
          output.push(currentReview);
        }
        return output;
      },[])
      .map((codeReview) => {
        return codeReview.formattedMessagePlusReviews();
      });

    let uniqed = codeReviewLines.filter(function(v,i) { return codeReviewLines.indexOf(v) == i; });
    let message = uniqed.join('\n');

    return {
      response_type: "in_channel",
      text: message,
      as_user: true,
      unfurl_links: false
    }
  }

  makeCRQueueNoItems() {
    return {
      response_type: "ephemeral",
      text: "No active code reviews found for your provided filters.",
      as_user: true,
      unfurl_links: false
    }
  }

  createCRMessage(codeReview) {
    let options = this._requestOptions("chat.postMessage", this.makeCRMessageData(codeReview));

    return request(options)
      .then((response) => {
        if(!response.ok) { throw new Error(response.error); }
        codeReview.updateMessageIDs(response.ts);
        return codeReview;
      })
      .catch((err) => {
        console.trace();
        console.error(SlackAPI, err);
        return codeReview;
      });
  }

  updateCRMessage(codeReview, itemEvent){
    if (!codeReview.messageIDs) return Promise.reject('no slack messageIDs yet');

    return Promise.all(codeReview.messageIDs.map(messageID => {
      let updatedData = this.makeCRMessageData(codeReview, itemEvent);
      updatedData.ts = messageID;

      let options = this._requestOptions("chat.update", updatedData);

      return request(options)
        .then((response) => {
          if(!response.ok) { throw new Error(response.error); }
          return codeReview;
        })
        .catch((err) => {
          console.trace();
          console.error(SlackAPI, err);
          return codeReview;
        });
      }))
      .catch((err) => {
        console.error(SlackAPI, err);
        console.trace();
        return codeReview;
      });
  }

  deleteCRMessages(codeReview) {
    if (!codeReview.messageIDs) return Promise.reject('no slack messageIDs yet');
    return Promise.all(codeReview.messageIDs.map(messageID => {
        let options = this._requestOptions("chat.delete", {
          channel: codeReview.channelID,
          ts: messageID
        });

        return request(options).then((response) => {
          if(!response.ok) { throw new Error(response.error); }
          return codeReview;
        }).catch((err) => {
          console.trace();
          console.error(SlackAPI, err);
          return codeReview;
       });
      }))
      .catch((err) => {
        console.error(SlackAPI, err);
        console.trace();
        return codeReview;
      });
  }

  addReactionToCRMessage(codeReview, name) {
    if (!codeReview.messageIDs) return Promise.reject('no slack messageIDs yet');
    return Promise.all(codeReview.messageIDs.map(messageID => {
      let options = this._requestOptions("reactions.add", {
        channel: codeReview.channelID,
        timestamp: messageID,
        name: name
      });

      return request(options)
        .then((response) => {
          if(!response.ok) { throw new Error(response.error); }
          return codeReview;
        })
        .catch((err) => {
          if (err.message !== 'already_reacted') {
            console.error(SlackAPI, err);
            console.trace();
          }
          return codeReview;
       })
      }))
      .catch((err) => {
        console.error(SlackAPI, err);
        console.trace();
        return codeReview;
      });
  }

  repostCR(codeReview) {
    let options = this._requestOptions('chat.postMessage', {
      channel: codeReview.channelID,
      text: this._formatCRRepost(codeReview),
      as_user: true
    });

    return request(options)
      .then((response) => {
        if(!response.ok) { throw new Error(response.error); }
        codeReview.updateMessageIDs(response.ts);
        return codeReview;
      })
      .catch((err) => {
        console.trace();
        console.error(SlackAPI, err);
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
    return 'Repost';
  }

  _formatCRMessage(codeReview) {
    return codeReview.pullRequestUrl;
  }
}

module.exports = new SlackAPI();
