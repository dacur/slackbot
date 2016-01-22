'use strict';

let slack = require("../lib/slack.js");

describe("Slack", () => {
  describe("Slack#createPRMessage", () => {
    it("creates a slack message from the pr", () => {
      let pr = {}
      slack.createPRMessage(pr);
    });
  });

  describe("Slack#deletePRMessage", () => {
  });

  describe("Slack#addReactionToPrMessage", () => {
  });
});
