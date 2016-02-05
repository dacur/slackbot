'use strict';

let nock = require('nock');

module.exports = () => {
  nock('https://slack.com:443', {"encodedQueryParams":true})
    .get('/api/chat.postMessage')
    .query(true)
    .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454703683.000018","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454703683.000018"}}, { 'content-type': 'application/json; charset=utf-8',
    'content-length': '162',
    connection: 'close',
    'access-control-allow-origin': '*',
    'cache-control': 'private, no-cache, no-store, must-revalidate',
    'content-security-policy': 'referrer no-referrer;',
    date: 'Fri, 05 Feb 2016 20:21:23 GMT',
    expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
    pragma: 'no-cache',
    server: 'Apache',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-accepted-oauth-scopes': 'chat:write:user,client',
    'x-content-type-options': 'nosniff',
    'x-oauth-scopes': 'identify,read,post,client',
    'x-xss-protection': '0',
    vary: 'Accept-Encoding',
    'x-cache': 'Miss from cloudfront',
    via: '1.1 ab171ddf1266582609db318bfa0b92d2.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'TGukaS7cM55CKQX-RUWAjpOC8Wn3bmgCFavfcVMZMWdSrB0F1_NELg==' });

  nock('https://slack.com:443', {"encodedQueryParams":true})
    .get('/api/chat.postMessage')
    .query(true)
    .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454703683.000019","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454703683.000019"}}, { 'content-type': 'application/json; charset=utf-8',
    'content-length': '162',
    connection: 'close',
    'access-control-allow-origin': '*',
    'cache-control': 'private, no-cache, no-store, must-revalidate',
    'content-security-policy': 'referrer no-referrer;',
    date: 'Fri, 05 Feb 2016 20:21:24 GMT',
    expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
    pragma: 'no-cache',
    server: 'Apache',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-accepted-oauth-scopes': 'chat:write:user,client',
    'x-content-type-options': 'nosniff',
    'x-oauth-scopes': 'identify,read,post,client',
    'x-xss-protection': '0',
    vary: 'Accept-Encoding',
    'x-cache': 'Miss from cloudfront',
    via: '1.1 426511a4e4e7baa481e8afd19c8e8bad.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'q8wW6p2aH4WRFozj_3U5T5i5kbkC5-WryextOE8nWr6tbY193ukzgA==' });

  nock('https://slack.com:443', {"encodedQueryParams":true})
    .get('/api/chat.delete')
    .query(true)
    .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454703683.000019"}, { 'content-type': 'application/json; charset=utf-8',
    'content-length': '58',
    connection: 'close',
    'access-control-allow-origin': '*',
    'cache-control': 'private, no-cache, no-store, must-revalidate',
    'content-security-policy': 'referrer no-referrer;',
    date: 'Fri, 05 Feb 2016 20:21:24 GMT',
    expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
    pragma: 'no-cache',
    server: 'Apache',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-accepted-oauth-scopes': 'chat:write:user,post',
    'x-content-type-options': 'nosniff',
    'x-oauth-scopes': 'identify,read,post,client',
    'x-xss-protection': '0',
    'x-cache': 'Miss from cloudfront',
    via: '1.1 83038ba72c6b8f14ce170ee7b725175e.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'e31FeLrwL0qaPu4QOcbXjpg5DveRYWyxz7bm4rTkY74yMV8N8woCqA==' });

  nock('https://slack.com:443', {"encodedQueryParams":true})
    .get('/api/chat.postMessage')
    .query(true)
    .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454703684.000021","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454703684.000021"}}, { 'content-type': 'application/json; charset=utf-8',
    'content-length': '162',
    connection: 'close',
    'access-control-allow-origin': '*',
    'cache-control': 'private, no-cache, no-store, must-revalidate',
    'content-security-policy': 'referrer no-referrer;',
    date: 'Fri, 05 Feb 2016 20:21:24 GMT',
    expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
    pragma: 'no-cache',
    server: 'Apache',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-accepted-oauth-scopes': 'chat:write:user,client',
    'x-content-type-options': 'nosniff',
    'x-oauth-scopes': 'identify,read,post,client',
    'x-xss-protection': '0',
    vary: 'Accept-Encoding',
    'x-cache': 'Miss from cloudfront',
    via: '1.1 e79368abba2ad21f1116209a83f7d54c.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'Cme0kc1tB6G2IKlvENB7KvIPrwN6_M6ZdPr5Z1jBf7TpW-iA5H9mkw==' });

  nock('https://slack.com:443', {"encodedQueryParams":true})
    .get('/api/reactions.add')
    .query(true)
    .reply(200, {"ok":true}, { 'content-type': 'application/json; charset=utf-8',
    'content-length': '11',
    connection: 'close',
    'access-control-allow-origin': '*',
    'cache-control': 'private, no-cache, no-store, must-revalidate',
    'content-security-policy': 'referrer no-referrer;',
    date: 'Fri, 05 Feb 2016 20:21:24 GMT',
    expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
    pragma: 'no-cache',
    server: 'Apache',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'x-accepted-oauth-scopes': 'reactions:write,post',
    'x-content-type-options': 'nosniff',
    'x-oauth-scopes': 'identify,read,post,client',
    'x-xss-protection': '0',
    'x-cache': 'Miss from cloudfront',
    via: '1.1 1f8fd8fe691277c1d2a58ff2ca95912f.cloudfront.net (CloudFront)',
    'x-amz-cf-id': '0mMmgfZrH4Dfwet2b3l50vEuHNWc8Vvrt0EnbvKbB4qdMvlWv_0FzQ==' });
}
