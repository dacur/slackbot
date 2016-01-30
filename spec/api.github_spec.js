'use strict';
var config;
try {
  config = require('../config.json');
} catch (e) {
  config = require('../config.example.json');
}

const request = require('request'),
    base_url = 'http://localhost:3000/',
    CrBot = require('../lib/crbot.js'),
    crbot = new CrBot(config);

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
        //console.log(promises);
        expect(promises[0].url).toBe(`https://api.github.com/repos/${prReq.user}/${prReq.repo}/pulls/${prReq.number}`);
        done();
      }).catch((err) => {
        console.log('ERRR',err);
      });
    });
  });
});
