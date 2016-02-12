'use strict';

const request = require('request');
const base_url = 'http://localhost:3000/';
const CrBot = require('../lib/crbot.js');
const crbot = new CrBot(require('../config.json'));

const mockGithub = require('./support/mockGithub.js');
const mockSlack = require('./support/mockSlack.js');
const nock = require('nock');

describe('CRBot Server', () => {
  let server, formData;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
    nock.disableNetConnect();
    nock.enableNetConnect('localhost:3000');
    mockGithub();
  });

  afterAll(() => {
    server.close();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('POST /code_review', () => {
    let messagePostMock;

    beforeEach(() => {
      messagePostMock = nock('https://slack.com')
        .filteringPath(/token=[^&]*/, 'token=XXX')
        .get('/api/chat.postMessage?token=XXX&channel=C2147483705&text=https%3A%2F%2Fapi.github.com%2Frepos%2Fsmashingboxes%2Fcode-review-bot%2Fpulls%2F1&as_user=true')
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
        console.log(response.headers);
        expect(response.statusCode).toBe(200);
        expect(messagePostMock.isDone()).toBe(true);
        done();
      });
    });
  });
});
