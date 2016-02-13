'use strict';

const request = require('request');
const base_url = 'http://localhost:3000/';
const CrBot = require('../lib/crbot.js');
const crbot = new CrBot(require('../config.json'));
const mockGithub = require('./support/mockGithub.js');
const mockSlack = require('./support/mockSlack.js');
const nock = require('nock');


describe('CRBot Github API', () => {
  let server;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
    nock.recorder.rec(); //maybe you want to record later on, yah?
    nock.disableNetConnect();
    nock.enableNetConnect('localhost:3000');
  });

  afterAll(() => {
    server.close();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('Demonstrate Getting PR Data from Github API', () => {
    beforeEach(() => {
      mockGithub();
      mockSlack();
    });

    it('Returns Data with .url param that matches the request params.', (done) => {
      let prReq = {
        'user': 'smashingboxes',
        'repo': 'code-review-bot',
        'number' : '1'
      };

      crbot.getPR(prReq).then((promises) => {
        expect(promises[0].url).toBe(`https://api.github.com/repos/${prReq.user}/${prReq.repo}/pulls/${prReq.number}`);
        done();
      }).catch((err) => {
        expect(false).toBe(true);
        done();
      });
    });

    it('Instagates the polling mechnaism and gets a comment response.', (done) => {
      let formData = {
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

      request.post(base_url + 'code_review', {form: formData}, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        setTimeout( done, 5000 );
      });
    });
  });
});
