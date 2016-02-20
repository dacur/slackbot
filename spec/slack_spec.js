'use strict';

let nock = require('nock');
let mockSlack = require('./support/mockSlack');
let CrBot = require('../lib/crbot');
let crBot = new CrBot(require('../config.json'));
let slack = require('../lib/api.slack');

describe(`${__filename.slice(__dirname.length + 1)}: Slack API`, () => {
  let codeReview;

  beforeAll(() => {
    nock.disableNetConnect();
    mockSlack();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  beforeEach(() => {
    codeReview = {
      channelID: "C0K673QFM",
      formattedMessage: () => "message"
    };
  });

  describe('Slack#createCRMessage', () => {
    it('creates a slack message from the code review', (done) => {
      slack.createCRMessage(codeReview).then((codeReview) => {
        expect(codeReview.messageIDs.length).toBe(1);
        done();
      });
    });
  });

  describe('Slack#deleteCRMessages', () => {
    it('deletes all slack messages based on a codeReview', (done) => {
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.deleteCRMessages(codeReview);
      }).then((codeReview) => {
        done();
      });
    });
  });

  describe('Slack#addReactionToPrMessage', () => {
    it('posts a reaction to a message', (done) => {
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.addReactionToCRMessage(codeReview, "thumbsup");
      }).then((codeReview) => {
        done();
      });
    });
  });

  describe('Slack#repostCR', () => {
    it('posts to the channel with @here', (done) => {
      slack.createCRMessage(codeReview)
        .then(codeReview => slack.repostCR(codeReview))
        .then(codeReview => expect(codeReview.messageIDs.length).toBe(2))
        .then(() => done());
    });
  });
});
