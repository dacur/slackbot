'use strict';
var request = require("request"),
    base_url = "http://localhost:3000/",
    CrBot = require("../lib/crbot.js"),
    crbot = new CrBot(require("../config.json"));

describe("CRBot Server", () => {
  var server;
  beforeAll((done) => {
    server = crbot.app.listen(3000, () => { done(); });
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /code_review With Data", () => {
    it("returns 200", (done) => {
      crbot.getPR({
          'user': 'smashingboxes',
          'repo': 'code-review-bot',
          'number' : '1'
      }).then((response) => {
        expect(response.url).toBe('https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1');
        done();
      });
    });
  });
  
});
