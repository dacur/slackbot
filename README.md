# Code Review Bot

## Dev Setup
1. Clone this repo, cd into it, & `npm install`
1. Generate a github access token at https://github.com/settings/tokens
1. Create a dev Slack token at https://api.slack.com/docs/oauth-test-tokens
1. Copy config.json.example to config.json; put your Github and Slack tokens in it
1. If you want to send messages to your dev environment from Slack, create or reuse a Slack slash-command, like `/test-cr`. Point the command at your dev server using ngrok or port forwarding.
1. `npm start`
1. In a Slack channel, you can now try `/test-cr <github-url>`

## Tests
1. `npm test`
