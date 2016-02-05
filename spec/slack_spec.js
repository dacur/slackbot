'use strict';

let nock = require('nock');
let mockSlack = require('./support/mockSlack');
let SlackAPI = require('../lib/api.slack.js');
let CrBot = require('../lib/CrBot');
let crBot = new CrBot(require('../config.json'));
let slack = new SlackAPI(crBot);

describe('Slack', () => {
  beforeAll(() => {
    nock.disableNetConnect();
    mockSlack();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

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
