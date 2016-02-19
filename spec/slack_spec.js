'use strict';

let nock = require('nock');
let mockSlack = require('./support/mockSlack');
let SlackAPI = require('../lib/api.slack.js');
let CrBot = require('../lib/crbot');
let crBot = new CrBot(require('../config.json'));
let slack = new SlackAPI(crBot);

describe(`${__filename.slice(__dirname.length + 1)}: Slack API`, () => {
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
        expect(codeReview.messageIDs.length).toBe(1);
        done();
      });
    });
  });

  describe('Slack#deleteCRMessages', () => {
    it('deletes all slack messages based on a codeReview', (done) => {
      let codeReview = { channelID: "C0K673QFM" };
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.deleteCRMessages(codeReview);
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

  describe('Slack#repostCR', () => {
    it('posts to the channel with @here', (done) => {
      let codeReview = { channelID: "C0K673QFM" };
      slack.createCRMessage(codeReview)
        .then(codeReview => slack.repostCR(codeReview))
        .then(codeReview => expect(codeReview.messageIDs.length).toBe(2))
        .then(() => done());
    });
  });
});
