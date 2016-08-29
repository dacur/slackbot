'use strict';

const request = require('request');
const base_url = 'http://localhost:3000/';
const CrBot = require('../lib/crbot.js');
const crbot = new CrBot(require('../config.json'));

const mockGithub = require('./support/mockGithub.js');
const mockSlack = require('./support/mockSlack.js');
const nock = require('nock');

describe(`${__filename.slice(__dirname.length + 1)}: CRBot Server`, () => {
  let server, formData;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
    //nock.recorder.rec();
    nock.disableNetConnect();
    nock.enableNetConnect('localhost:3000');
    mockGithub();
  });

  afterAll(() => {
    server.close();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  let messagePostMock;

  beforeEach(() => {
    messagePostMock = nock('https://slack.com')
      .filteringPath(/token=[^&]*/, 'token=XXX')
      .get((uri) => {
        return uri.match(/chat\.postMessage/);
      })
      .reply(200, {
        "ok": true,
        "channel":"C0K673QFM",
        "ts":"1454708667.000126",
        "message": {
          "type":"message",
          "user":"U0K63EVLL",
          "text":"Dummy message for now",
          "ts":"1454708667.000126"
        }
      });
  });

  describe('POST /code_review', () => {
    it('returns 200', (done) => {
      formData = {
        token: 'test-token',
        team_id: 'T0001',
        team_domain: 'example',
        channel_id: 'C2147483705',
        channel_name: 'test',
        user_id: 'U2147483697',
        user_name: 'Steve',
        command: '/cr',
        text: 'github.com/smashingboxes/code-review-bot/pulls/1',
        response_url: 'https://hooks.slack.com/commands/1234/5678'
      }
      request.post(base_url + 'code_review', { form: formData }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(messagePostMock.isDone()).toBe(true);
        done();
      });
    });

    it('returns 404 for a malformed pr', (done) => {
      mockSlack();

      formData = {
        token: 'test-token',
        team_id: 'T0001',
        team_domain: 'example',
        channel_id: 'C2147483705',
        channel_name: 'test',
        user_id: 'U2147483697',
        user_name: 'Steve',
        command: '/cr',
        text: 'blah blah blah this is an error',
        response_url: 'https://hooks.slack.com/commands/1234/5678'
      }

      request.post(base_url + 'code_review', { form: formData }, (error, response, body) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    it('returns 404 for a missing pr', (done) => {
      mockSlack();

      formData = {
        token: 'test-token',
        team_id: 'T0001',
        team_domain: 'example',
        channel_id: 'C2147483705',
        channel_name: 'test',
        user_id: 'U2147483697',
        user_name: 'Steve',
        command: '/cr',
        text: 'blah blah blah this is an error',
        response_url: 'https://hooks.slack.com/commands/1234/5678'
      }

      request.post(base_url + 'code_review', { form: formData }, (error, response, body) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    it('adds a new CodeReview Instance', (done) => {
      mockSlack();

      let req = {
        body : {
          token: 'test-token',
          team_id: 'T0001',
          team_domain: 'example',
          channel_id: 'C2147483705',
          channel_name: 'test',
          user_id: 'U2147483697',
          user_name: 'Steve',
          command: '/cr',
          text: 'github.com/smashingboxes/code-review-bot/pulls/1',
          response_url: 'https://hooks.slack.com/commands/1234/5678'
        }
      };

      let res = {
        status: function () {
          return this;
        },
        send: function () {
          return this;
        }
      };

      console.log(crbot.ready);
      crbot.ready.then(() => {
        crbot.onIncomingCodeReview(req, res, () => {
            fail();
            done();
          })
          .then((codeReview) => {
            codeReview.emitter
              .on('killme', () => {
                console.log(crbot.activeReviews.length);
                done();
              })
              .catch((err) => {
                fail();
                done();
              });
          });
      })
    });
  });
});
