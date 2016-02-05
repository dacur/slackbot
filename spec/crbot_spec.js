'use strict';

const request = require('request'),
    base_url = 'http://localhost:3000/',
    CrBot = require('../lib/crbot.js'),
    crbot = new CrBot(require('../config.json'));

describe('CRBot Server', () => {
  let server, formData;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
  });

  afterAll(() => {
    server.close();
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
        done();
      });
    });
  });
});
