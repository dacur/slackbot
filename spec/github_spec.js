'use strict';

const request = require('request');
const base_url = 'http://localhost:3000/';
const CrBot = require('../lib/crbot.js');
const crbot = new CrBot(require('../config.json'));
const mockGithub = require('./support/mockGithub.js');
const nock = require('nock');


describe(`${__filename.slice(__dirname.length + 1)}: Github API`, () => {
  let server;

  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
    //nock.recorder.rec(); //maybe you want to record later on, yah?
    nock.disableNetConnect();
  });

  afterAll(() => {
    server.close();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('Demonstrate Getting PR Data from Github API', () => {
    beforeEach(() => {
      mockGithub();
    });

    it('Returns Data with .url param that matches the request params.', (done) => {
      let prReq = {
        'user': 'smashingboxes',
        'repo': 'code-review-bot',
        'title': 'simple github_spec.js cr',
        'number' : '1'
      };

      crbot.getPR(prReq).then((promises) => {
        expect(promises[0].url).toBe(`https://api.github.com/repos/${prReq.user}/${prReq.repo}/pulls/${prReq.number}`);
        done();
      }).catch((err) => {
        fail();
        done();
      });
    });
  });
});
