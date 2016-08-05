'use strict';

let nock = require('nock');
let mockSlack = require('./support/mockSlack');
let CrBot = require('../lib/crbot');
let crBot = new CrBot(require('../config.json'));
let slack = require('../lib/api.slack');
let prEvents = require('../lib/util/prEvents');

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
      formattedMessage: () => "message",
      title: () => "title",
      body: () => "body",
      authorThumbnail: () => "",
      authorName: () => "Someone"
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

  describe('Slack#updateCRMessage', () => {
    it('posts an updated message', (done) => {
      slack.createCRMessage(codeReview).then((codeReview) => {
        return slack.updateCRMessage(codeReview, "merged");
      }).then((codeReview) => {
        done();
      });
    });

    let testUpdateStatus = (codeReview, itemStatus) => {
      return slack.createCRMessage(codeReview).then((codeReview) => {
        let openMessage = slack.makeCRMessageData(codeReview, itemStatus);
        let attachments = JSON.parse(openMessage.attachments);
        expect(attachments[0].color).toBe(prEvents.color(itemStatus));
      });
    }

    it('assigns an open color', (done) => {
      testUpdateStatus(codeReview, 'none').then(done)
    });

    it('assigns a closed color', (done) => {
      testUpdateStatus(codeReview, 'closed').then(done)
    });

    it('assigns a merged color', (done) => {
      testUpdateStatus(codeReview, 'merged').then(done)
    });

    it('assigns a default color for undefined events', (done) => {
      testUpdateStatus(codeReview, undefined).then(done)
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
