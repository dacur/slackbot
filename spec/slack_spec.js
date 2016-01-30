'use strict';

let Slack = require('../lib/slack.js');
let CrBot = require('../lib/CrBot');
let crBot = new CrBot(require('../config.json'));
let slack = new Slack(crBot);

describe('Slack', () => {
  describe('Slack#createCRMessage', () => {
    it('creates a slack message from the code review', (done) => {
      let codeReview = { channelID: "C0K673QFM" };
      slack.createCRMessage(codeReview).then((codeReview) => {
        expect(codeReview.messageID).not.toBe(undefined);
        done();
      });
    });
  });

  describe('Slack#deleteCRMessage', () => {
    it('deletes a slack message based on messageID', (done) => {
      let codeReview = { channelID: "C0K673QFM" };
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.deleteCRMessage(codeReview);
      }).then((codeReview) => {
        done();
      });
    });
  });

  describe('Slack#addReactionToPrMessage', () => {
    it('posts a reaction to a message', (done) => {
      let codeReview = { channelID: "C0K673QFM" };
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.addReactionToCRMessage(codeReview, "thumbsup");
      }).then((codeReview) => {
        done();
      });
    });
  });
});
