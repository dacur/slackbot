'use strict';

const request = require('request'),
    base_url = 'http://localhost:3000/',
    CrBot = require('../lib/crbot.js'),
    crbot = new CrBot(require('../config.json'));

describe('CRBot Github API', () => {
  let server;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
  });

  afterAll(() => {
    server.close();
  });

  describe('Demonstrate Getting PR Data from Github API', () => {
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
  });
});
