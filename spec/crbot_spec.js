var request = require("request"),
    base_url = "http://localhost:3000/",
    CrBot = require("../lib/crbot.js"),
    crbot = new CrBot({ token: "token", name: "bot" });

describe("CRBot Server", function() {
  var server;
  beforeAll(function(done) {
    server = crbot.app.listen(3000, function() { done(); });
  });

  afterAll(function() {
    server.close()
  });

  describe("GET /", function() {
    it("returns a status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
