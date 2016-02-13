'use strict';
const Github = require('./api.github');
const EventEmitter = require('events');
const extend = require('deep-extend');

class CodeReview {
  constructor(githubResponse, githubPRParams, slackRequest) {
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    this._githubPRParams = githubPRParams;
    //console.log(slackRequest);
    this._slackRequest = slackRequest;

    this.pullRequestUrl = this._githubPR.url;
    this.channelID = this._slackRequest.channel_id;

    //console.log('\n\n\n\nPolling: ', githubPRParams);

    this.pollGithubForComments();
  }

  _deleteInstance() {
    //Event type to delete slack message on
    //on prEvent.event == 'closed'
  }

  pollGithubForComments() {
    this.poll = setTimeout(() => {

      var prParamsEvents = extend({}, this._githubPRParams);
      var prParamsComments = extend({}, this._githubPRParams);

      console.log('Polling: ', prParamsEvents, prParamsComments);

      if (this._githubPREvents) {
        prParamsEvents.headers = {};
        prParamsEvents.headers['If-None-Match'] = this._githubPREvents.meta.etag.replace('"','');
      }
      if (this._githubPRComments) {
        prParamsComments.headers = {};
        prParamsComments.headers['If-None-Match'] = this._githubPRComments.meta.etag.replace('"','');
      }


      Github.getPRChanges(prParamsEvents, prParamsComments)
        .then((responses) => {
          console.log('\n\n\n\nPolling: ');
          console.log(responses);
          if ( !this._githubPREvents ) {
            this.pollGithubForComments();
          }
          this._githubPREvents = responses[0];
          this._githubPRComments = responses[1];
        }).catch((err) => {
          console.log(CodeReview, err);
        });
    }, 100);
  }
}

module.exports = CodeReview;
