'use strict';

const path = require('path');
const extensionMap = require('./util/extensions.json');
const typeMap = require('./util/type_to_emoji.json');
const sizeMap = require('./util/size.json');

class CodeReview {
  constructor(githubResponse, slackRequest) {
    this._githubPR = githubResponse[0];
    this._githubPRFiles = githubResponse[1];
    this._slackRequest = slackRequest;

    this.pullRequestUrl = this._githubPR.html_url;
    this.channelID = this._slackRequest.channel_id;
  }

  formattedMessage() {
    if(this._formattedMessage) { return this._formattedMessage; }

    return `${this._typeEmojis()}${this.pullRequestUrl} ${this._sizeEmoji()}`
  }

  _sizeEmoji() {
    let emojis;

    if (this._githubPR.additions < 50) {
      emojis = sizeMap["small"];
    } else if (this._githubPR.additions < 200) {
      emojis = sizeMap["medium"];
    } else {
      emojis = sizeMap["large"];
    }

    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  _typeEmojis() {
    const fileExts = this._fileExtensions();
    let emojis = fileExts
      .map((ext) => extensionMap[ext.toLowerCase()])
      .map((type) => typeMap[type])
      .filter(this._uniq())
      .join(' ');

    if(emojis) { emojis = emojis + ' ' }
    return emojis;
  }

  _fileExtensions() {
    return this._githubPRFiles
      .map((file) => path.extname(file.filename))
      .filter(ext => ext);
  }

  _uniq() {
    const seen = {};
    return (emoji) => !(emoji in seen) && (seen[emoji] = 1);
  }
}

module.exports = CodeReview
