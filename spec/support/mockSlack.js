'use strict';

let nock = require('nock');

module.exports = () => {
nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.postMessage')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708667.000126","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454708667.000126"}}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '162',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:27 GMT',
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
  via: '1.1 631585eaa766d0d1b2a196fb1d81ea69.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'tj4YNgM1VVBahdBmZfj714X2K6_RV2cEls2FQgWSCZzAuHe8ufxnNQ==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.postMessage')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708667.000127","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454708667.000127"}}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '162',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:27 GMT',
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
  via: '1.1 9438b4fa578cbce283b48cf092373802.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'cYPUqGY7GFlG50V5C7Zm1ekCOaFGKQQfIKku3GS3Xs2bNCwp6gOSKA==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.delete')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708667.000127"}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '58',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:27 GMT',
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
  'x-amz-cf-id': 'rvheI9kayWA8iedNMzKE4qouIVZPRvK21Jwv7sBrzhLZ10SB5jOCpg==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.postMessage')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708668.000129","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454708668.000129"}}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '162',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:28 GMT',
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
  via: '1.1 30ee516a44bb8aab0201d3423b566498.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'Rx426IgAA-1LWJ1mO-d5815ur4ovslXi3Y57Zv-yM5lul0d95OqQxQ==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/reactions.add')
  .query(true)
  .reply(200, {"ok":true}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '11',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:28 GMT',
  expires: 'Mon, 26 Jul 1997 05:00:00 GMT',
  pragma: 'no-cache',
  server: 'Apache',
  'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
  'x-accepted-oauth-scopes': 'reactions:write,post',
  'x-content-type-options': 'nosniff',
  'x-oauth-scopes': 'identify,read,post,client',
  'x-xss-protection': '0',
  'x-cache': 'Miss from cloudfront',
  via: '1.1 0a7fa1445751b2b1da3408b5e396772e.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'VdoRlYZYK2MdK80q9f-CFM1yAnwi38uTyX8ZaUwnjnMz6de9OJao1w==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.postMessage')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708668.000130","message":{"type":"message","user":"U0K63EVLL","text":"Dummy message for now","ts":"1454708668.000130"}}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '162',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:28 GMT',
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
  via: '1.1 4a495e8480f789db14c4afa001a38181.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'BUMRSqjTX0sDujIeHX8GLIZBSk8p_wsn66x8a3rknc13V5atu-FWSA==' });

nock('https://slack.com:443', {"encodedQueryParams":true})
  .get('/api/chat.postMessage')
  .query(true)
  .reply(200, {"ok":true,"channel":"C0K673QFM","ts":"1454708668.000131","message":{"type":"message","user":"U0K63EVLL","text":"Repost","ts":"1454708668.000131"}}, { 'content-type': 'application/json; charset=utf-8',
  'content-length': '147',
  connection: 'close',
  'access-control-allow-origin': '*',
  'cache-control': 'private, no-cache, no-store, must-revalidate',
  'content-security-policy': 'referrer no-referrer;',
  date: 'Fri, 05 Feb 2016 21:44:29 GMT',
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
  via: '1.1 4ee5063dc9b3d6f9bda9588d4fd84fe7.cloudfront.net (CloudFront)',
  'x-amz-cf-id': 'SFK9-DT1YdPVzvnWve5wD9Wi2VUczUVvFsISvNP4iO1hLG6f9b3h2w==' });
}
