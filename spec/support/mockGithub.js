const nock = require('nock');

module.exports = function () {

nock('https://api.github.com:443', {
  "encodedQueryParams": true
})
.get('/repos/smashingboxes/code-review-bot/pulls/1')
.query(true)
.reply(200, {
  "url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1",
  "id": 56939425,
  "html_url": "https://github.com/smashingboxes/code-review-bot/pull/1",
  "diff_url": "https://github.com/smashingboxes/code-review-bot/pull/1.diff",
  "patch_url": "https://github.com/smashingboxes/code-review-bot/pull/1.patch",
  "issue_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/1",
  "number": 1,
  "state": "closed",
  "locked": false,
  "title": "Handle A Post With Slack Data",
  "user": {
    "login": "joeyjoejoejr",
    "id": 1141502,
    "avatar_url": "https://avatars.githubusercontent.com/u/1141502?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/joeyjoejoejr",
    "html_url": "https://github.com/joeyjoejoejr",
    "followers_url": "https://api.github.com/users/joeyjoejoejr/followers",
    "following_url": "https://api.github.com/users/joeyjoejoejr/following{/other_user}",
    "gists_url": "https://api.github.com/users/joeyjoejoejr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/joeyjoejoejr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/joeyjoejoejr/subscriptions",
    "organizations_url": "https://api.github.com/users/joeyjoejoejr/orgs",
    "repos_url": "https://api.github.com/users/joeyjoejoejr/repos",
    "events_url": "https://api.github.com/users/joeyjoejoejr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/joeyjoejoejr/received_events",
    "type": "User",
    "site_admin": false
  },
  "body": "",
  "created_at": "2016-01-22T20:45:49Z",
  "updated_at": "2016-01-22T21:00:29Z",
  "closed_at": "2016-01-22T21:00:27Z",
  "merged_at": "2016-01-22T21:00:26Z",
  "merge_commit_sha": "bcef61981b498465d6236cbecf890a547bf8c514",
  "assignee": null,
  "milestone": null,
  "commits_url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1/commits",
  "review_comments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1/comments",
  "review_comment_url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/comments{/number}",
  "comments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/1/comments",
  "statuses_url": "https://api.github.com/repos/smashingboxes/code-review-bot/statuses/27dc60321711782ec4e4200c781aa6b049ad1a08",
  "head": {
    "label": "smashingboxes:features/handle_slash_webhook",
    "ref": "features/handle_slash_webhook",
    "sha": "27dc60321711782ec4e4200c781aa6b049ad1a08",
    "user": {
      "login": "smashingboxes",
      "id": 784473,
      "avatar_url": "https://avatars.githubusercontent.com/u/784473?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/smashingboxes",
      "html_url": "https://github.com/smashingboxes",
      "followers_url": "https://api.github.com/users/smashingboxes/followers",
      "following_url": "https://api.github.com/users/smashingboxes/following{/other_user}",
      "gists_url": "https://api.github.com/users/smashingboxes/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/smashingboxes/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/smashingboxes/subscriptions",
      "organizations_url": "https://api.github.com/users/smashingboxes/orgs",
      "repos_url": "https://api.github.com/users/smashingboxes/repos",
      "events_url": "https://api.github.com/users/smashingboxes/events{/privacy}",
      "received_events_url": "https://api.github.com/users/smashingboxes/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "repo": {
      "id": 50142699,
      "name": "code-review-bot",
      "full_name": "smashingboxes/code-review-bot",
      "owner": {
        "login": "smashingboxes",
        "id": 784473,
        "avatar_url": "https://avatars.githubusercontent.com/u/784473?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/smashingboxes",
        "html_url": "https://github.com/smashingboxes",
        "followers_url": "https://api.github.com/users/smashingboxes/followers",
        "following_url": "https://api.github.com/users/smashingboxes/following{/other_user}",
        "gists_url": "https://api.github.com/users/smashingboxes/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/smashingboxes/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/smashingboxes/subscriptions",
        "organizations_url": "https://api.github.com/users/smashingboxes/orgs",
        "repos_url": "https://api.github.com/users/smashingboxes/repos",
        "events_url": "https://api.github.com/users/smashingboxes/events{/privacy}",
        "received_events_url": "https://api.github.com/users/smashingboxes/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "private": false,
      "html_url": "https://github.com/smashingboxes/code-review-bot",
      "description": null,
      "fork": false,
      "url": "https://api.github.com/repos/smashingboxes/code-review-bot",
      "forks_url": "https://api.github.com/repos/smashingboxes/code-review-bot/forks",
      "keys_url": "https://api.github.com/repos/smashingboxes/code-review-bot/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/smashingboxes/code-review-bot/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/smashingboxes/code-review-bot/teams",
      "hooks_url": "https://api.github.com/repos/smashingboxes/code-review-bot/hooks",
      "issue_events_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/events{/number}",
      "events_url": "https://api.github.com/repos/smashingboxes/code-review-bot/events",
      "assignees_url": "https://api.github.com/repos/smashingboxes/code-review-bot/assignees{/user}",
      "branches_url": "https://api.github.com/repos/smashingboxes/code-review-bot/branches{/branch}",
      "tags_url": "https://api.github.com/repos/smashingboxes/code-review-bot/tags",
      "blobs_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/smashingboxes/code-review-bot/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/smashingboxes/code-review-bot/languages",
      "stargazers_url": "https://api.github.com/repos/smashingboxes/code-review-bot/stargazers",
      "contributors_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contributors",
      "subscribers_url": "https://api.github.com/repos/smashingboxes/code-review-bot/subscribers",
      "subscription_url": "https://api.github.com/repos/smashingboxes/code-review-bot/subscription",
      "commits_url": "https://api.github.com/repos/smashingboxes/code-review-bot/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/{+path}",
      "compare_url": "https://api.github.com/repos/smashingboxes/code-review-bot/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/smashingboxes/code-review-bot/merges",
      "archive_url": "https://api.github.com/repos/smashingboxes/code-review-bot/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/smashingboxes/code-review-bot/downloads",
      "issues_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues{/number}",
      "pulls_url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/smashingboxes/code-review-bot/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/smashingboxes/code-review-bot/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/smashingboxes/code-review-bot/labels{/name}",
      "releases_url": "https://api.github.com/repos/smashingboxes/code-review-bot/releases{/id}",
      "deployments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/deployments",
      "created_at": "2016-01-21T23:01:46Z",
      "updated_at": "2016-01-23T13:59:09Z",
      "pushed_at": "2016-02-05T21:29:33Z",
      "git_url": "git://github.com/smashingboxes/code-review-bot.git",
      "ssh_url": "git@github.com:smashingboxes/code-review-bot.git",
      "clone_url": "https://github.com/smashingboxes/code-review-bot.git",
      "svn_url": "https://github.com/smashingboxes/code-review-bot",
      "homepage": null,
      "size": 22,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "JavaScript",
      "has_issues": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "open_issues_count": 1,
      "forks": 0,
      "open_issues": 1,
      "watchers": 1,
      "default_branch": "master"
    }
  },
  "base": {
    "label": "smashingboxes:master",
    "ref": "master",
    "sha": "0c25f2bc430d83bf8478904320af7a71c0191cf3",
    "user": {
      "login": "smashingboxes",
      "id": 784473,
      "avatar_url": "https://avatars.githubusercontent.com/u/784473?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/smashingboxes",
      "html_url": "https://github.com/smashingboxes",
      "followers_url": "https://api.github.com/users/smashingboxes/followers",
      "following_url": "https://api.github.com/users/smashingboxes/following{/other_user}",
      "gists_url": "https://api.github.com/users/smashingboxes/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/smashingboxes/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/smashingboxes/subscriptions",
      "organizations_url": "https://api.github.com/users/smashingboxes/orgs",
      "repos_url": "https://api.github.com/users/smashingboxes/repos",
      "events_url": "https://api.github.com/users/smashingboxes/events{/privacy}",
      "received_events_url": "https://api.github.com/users/smashingboxes/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "repo": {
      "id": 50142699,
      "name": "code-review-bot",
      "full_name": "smashingboxes/code-review-bot",
      "owner": {
        "login": "smashingboxes",
        "id": 784473,
        "avatar_url": "https://avatars.githubusercontent.com/u/784473?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/smashingboxes",
        "html_url": "https://github.com/smashingboxes",
        "followers_url": "https://api.github.com/users/smashingboxes/followers",
        "following_url": "https://api.github.com/users/smashingboxes/following{/other_user}",
        "gists_url": "https://api.github.com/users/smashingboxes/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/smashingboxes/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/smashingboxes/subscriptions",
        "organizations_url": "https://api.github.com/users/smashingboxes/orgs",
        "repos_url": "https://api.github.com/users/smashingboxes/repos",
        "events_url": "https://api.github.com/users/smashingboxes/events{/privacy}",
        "received_events_url": "https://api.github.com/users/smashingboxes/received_events",
        "type": "Organization",
        "site_admin": false
      },
      "private": false,
      "html_url": "https://github.com/smashingboxes/code-review-bot",
      "description": null,
      "fork": false,
      "url": "https://api.github.com/repos/smashingboxes/code-review-bot",
      "forks_url": "https://api.github.com/repos/smashingboxes/code-review-bot/forks",
      "keys_url": "https://api.github.com/repos/smashingboxes/code-review-bot/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/smashingboxes/code-review-bot/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/smashingboxes/code-review-bot/teams",
      "hooks_url": "https://api.github.com/repos/smashingboxes/code-review-bot/hooks",
      "issue_events_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/events{/number}",
      "events_url": "https://api.github.com/repos/smashingboxes/code-review-bot/events",
      "assignees_url": "https://api.github.com/repos/smashingboxes/code-review-bot/assignees{/user}",
      "branches_url": "https://api.github.com/repos/smashingboxes/code-review-bot/branches{/branch}",
      "tags_url": "https://api.github.com/repos/smashingboxes/code-review-bot/tags",
      "blobs_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/smashingboxes/code-review-bot/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/smashingboxes/code-review-bot/languages",
      "stargazers_url": "https://api.github.com/repos/smashingboxes/code-review-bot/stargazers",
      "contributors_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contributors",
      "subscribers_url": "https://api.github.com/repos/smashingboxes/code-review-bot/subscribers",
      "subscription_url": "https://api.github.com/repos/smashingboxes/code-review-bot/subscription",
      "commits_url": "https://api.github.com/repos/smashingboxes/code-review-bot/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/smashingboxes/code-review-bot/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/{+path}",
      "compare_url": "https://api.github.com/repos/smashingboxes/code-review-bot/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/smashingboxes/code-review-bot/merges",
      "archive_url": "https://api.github.com/repos/smashingboxes/code-review-bot/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/smashingboxes/code-review-bot/downloads",
      "issues_url": "https://api.github.com/repos/smashingboxes/code-review-bot/issues{/number}",
      "pulls_url": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/smashingboxes/code-review-bot/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/smashingboxes/code-review-bot/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/smashingboxes/code-review-bot/labels{/name}",
      "releases_url": "https://api.github.com/repos/smashingboxes/code-review-bot/releases{/id}",
      "deployments_url": "https://api.github.com/repos/smashingboxes/code-review-bot/deployments",
      "created_at": "2016-01-21T23:01:46Z",
      "updated_at": "2016-01-23T13:59:09Z",
      "pushed_at": "2016-02-05T21:29:33Z",
      "git_url": "git://github.com/smashingboxes/code-review-bot.git",
      "ssh_url": "git@github.com:smashingboxes/code-review-bot.git",
      "clone_url": "https://github.com/smashingboxes/code-review-bot.git",
      "svn_url": "https://github.com/smashingboxes/code-review-bot",
      "homepage": null,
      "size": 22,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "JavaScript",
      "has_issues": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": false,
      "forks_count": 0,
      "mirror_url": null,
      "open_issues_count": 1,
      "forks": 0,
      "open_issues": 1,
      "watchers": 1,
      "default_branch": "master"
    }
  },
  "_links": {
    "self": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1"
    },
    "html": {
      "href": "https://github.com/smashingboxes/code-review-bot/pull/1"
    },
    "issue": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/1"
    },
    "comments": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/issues/1/comments"
    },
    "review_comments": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1/comments"
    },
    "review_comment": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/comments{/number}"
    },
    "commits": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/pulls/1/commits"
    },
    "statuses": {
      "href": "https://api.github.com/repos/smashingboxes/code-review-bot/statuses/27dc60321711782ec4e4200c781aa6b049ad1a08"
    }
  },
  "merged": true,
  "mergeable": null,
  "mergeable_state": "unknown",
  "merged_by": {
    "login": "joeyjoejoejr",
    "id": 1141502,
    "avatar_url": "https://avatars.githubusercontent.com/u/1141502?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/joeyjoejoejr",
    "html_url": "https://github.com/joeyjoejoejr",
    "followers_url": "https://api.github.com/users/joeyjoejoejr/followers",
    "following_url": "https://api.github.com/users/joeyjoejoejr/following{/other_user}",
    "gists_url": "https://api.github.com/users/joeyjoejoejr/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/joeyjoejoejr/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/joeyjoejoejr/subscriptions",
    "organizations_url": "https://api.github.com/users/joeyjoejoejr/orgs",
    "repos_url": "https://api.github.com/users/joeyjoejoejr/repos",
    "events_url": "https://api.github.com/users/joeyjoejoejr/events{/privacy}",
    "received_events_url": "https://api.github.com/users/joeyjoejoejr/received_events",
    "type": "User",
    "site_admin": false
  },
  "comments": 1,
  "review_comments": 3,
  "commits": 2,
  "additions": 30,
  "deletions": 12,
  "changed_files": 4
}, {
  server: 'GitHub.com',
  date: 'Fri, 05 Feb 2016 21:33:49 GMT',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '16506',
  connection: 'close',
  status: '200 OK',
  'x-ratelimit-limit': '5000',
  'x-ratelimit-remaining': '4944',
  'x-ratelimit-reset': '1454709961',
  'cache-control': 'public, max-age=60, s-maxage=60',
  'last-modified': 'Fri, 22 Jan 2016 21:00:29 GMT',
  etag: '"3ab95683d09c9aff68a67f694b2d3a84"',
  vary: 'Accept, Accept-Encoding',
  'x-github-media-type': 'github.v3; format=json',
  'access-control-allow-credentials': 'true',
  'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
  'access-control-allow-origin': '*',
  'content-security-policy': 'default-src \'none\'',
  'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'deny',
  'x-xss-protection': '1; mode=block',
  'x-served-by': '065b43cd9674091fec48a221b420fbb3',
  'x-github-request-id': '48CDAEA0:14590:1E06E72:56B5153D'
});

nock('https://api.github.com:443', {
  "encodedQueryParams": true
})
.get('/repos/smashingboxes/code-review-bot/pulls/1/files')
.query(true)
.reply(200, [{
  "sha": "60d6da5fbba23e02c20753ef009dba83fa80f009",
  "filename": "bin/crbot",
  "status": "modified",
  "additions": 1,
  "deletions": 1,
  "changes": 2,
  "blob_url": "https://github.com/smashingboxes/code-review-bot/blob/27dc60321711782ec4e4200c781aa6b049ad1a08/bin/crbot",
  "raw_url": "https://github.com/smashingboxes/code-review-bot/raw/27dc60321711782ec4e4200c781aa6b049ad1a08/bin/crbot",
  "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/bin/crbot?ref=27dc60321711782ec4e4200c781aa6b049ad1a08",
  "patch": "@@ -19,4 +19,4 @@ let crbot = new CrBot({ token: token, name: name });\n \n // TODO: add a port flag\n \n-crbot.app.listen(3000);\n+crbot.app.listen(8888);"
}, {
  "sha": "353ad30f338571f4b182380159d025fb7fa2f6e2",
  "filename": "lib/crbot.js",
  "status": "modified",
  "additions": 8,
  "deletions": 4,
  "changes": 12,
  "blob_url": "https://github.com/smashingboxes/code-review-bot/blob/27dc60321711782ec4e4200c781aa6b049ad1a08/lib/crbot.js",
  "raw_url": "https://github.com/smashingboxes/code-review-bot/raw/27dc60321711782ec4e4200c781aa6b049ad1a08/lib/crbot.js",
  "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/lib/crbot.js?ref=27dc60321711782ec4e4200c781aa6b049ad1a08",
  "patch": "@@ -1,10 +1,14 @@\n 'use strict';\n \n-var express = require('express');\n-var app = express();\n+const express = require('express'),\n+    bodyParser = require('body-parser');\n+const app = express();\n \n-app.get(\"/\", function(req, res) {\n-  res.send(\"hello world\");\n+app.use(bodyParser.urlencoded({ extended: true }));\n+\n+app.post(\"/code_review\", (req,res) => {\n+  // console.log(req);\n+  res.end();\n });\n \n class CrBot {"
}, {
  "sha": "eaa0b9b4c8abd924e66ea36285b427116c582d22",
  "filename": "package.json",
  "status": "modified",
  "additions": 1,
  "deletions": 0,
  "changes": 1,
  "blob_url": "https://github.com/smashingboxes/code-review-bot/blob/27dc60321711782ec4e4200c781aa6b049ad1a08/package.json",
  "raw_url": "https://github.com/smashingboxes/code-review-bot/raw/27dc60321711782ec4e4200c781aa6b049ad1a08/package.json",
  "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/package.json?ref=27dc60321711782ec4e4200c781aa6b049ad1a08",
  "patch": "@@ -25,6 +25,7 @@\n     \"request\": \"^2.67.0\"\n   },\n   \"dependencies\": {\n+    \"body-parser\": \"^1.14.2\",\n     \"express\": \"^4.13.4\"\n   }\n }"
}, {
  "sha": "58f90284b2fdd297ecdda673943da2df6afe16e3",
  "filename": "spec/crbot_spec.js",
  "status": "modified",
  "additions": 20,
  "deletions": 7,
  "changes": 27,
  "blob_url": "https://github.com/smashingboxes/code-review-bot/blob/27dc60321711782ec4e4200c781aa6b049ad1a08/spec/crbot_spec.js",
  "raw_url": "https://github.com/smashingboxes/code-review-bot/raw/27dc60321711782ec4e4200c781aa6b049ad1a08/spec/crbot_spec.js",
  "contents_url": "https://api.github.com/repos/smashingboxes/code-review-bot/contents/spec/crbot_spec.js?ref=27dc60321711782ec4e4200c781aa6b049ad1a08",
  "patch": "@@ -3,19 +3,32 @@ var request = require(\"request\"),\n     CrBot = require(\"../lib/crbot.js\"),\n     crbot = new CrBot({ token: \"token\", name: \"bot\" });\n \n-describe(\"CRBot Server\", function() {\n+describe(\"CRBot Server\", () => {\n   var server;\n-  beforeAll(function(done) {\n-    server = crbot.app.listen(3000, function() { done(); });\n+  beforeAll((done) => {\n+    server = crbot.app.listen(3000, () => { done(); });\n   });\n \n-  afterAll(function() {\n+  afterAll(() => {\n     server.close()\n   });\n \n-  describe(\"GET /\", function() {\n-    it(\"returns a status code 200\", function(done) {\n-      request.get(base_url, function(error, response, body) {\n+  describe(\"POST /code_review\", () => {\n+    it(\"returns 200\", (done) => {\n+      formData = {\n+        token: \"test-token\",\n+        team_id: \"T0001\",\n+        team_domain: \"example\",\n+        channel_id: \"C2147483705\",\n+        channel_name: \"test\",\n+        user_id: \"U2147483697\",\n+        user_name: \"Steve\",\n+        command: \"/cr\",\n+        text: \"github.com/smashingboxes/cr-bot/pulls/1\",\n+        response_url: \"https://hooks.slack.com/commands/1234/5678\"\n+      }\n+\n+      request.post(base_url + 'code_review', { form: formData }, (error, response, body) => {\n         expect(response.statusCode).toBe(200);\n         done();\n       });"
}], {
  server: 'GitHub.com',
  date: 'Fri, 05 Feb 2016 21:33:49 GMT',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '4278',
  connection: 'close',
  status: '200 OK',
  'x-ratelimit-limit': '5000',
  'x-ratelimit-remaining': '4945',
  'x-ratelimit-reset': '1454709961',
  'cache-control': 'public, max-age=60, s-maxage=60',
  'last-modified': 'Fri, 22 Jan 2016 21:00:29 GMT',
  etag: '"79ca9e12e69b08526a1d5992abb191c6"',
  vary: 'Accept, Accept-Encoding',
  'x-github-media-type': 'github.v3; format=json',
  'access-control-allow-credentials': 'true',
  'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
  'access-control-allow-origin': '*',
  'content-security-policy': 'default-src \'none\'',
  'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'deny',
  'x-xss-protection': '1; mode=block',
  'x-served-by': '173530fed4bbeb1e264b2ed22e8b5c20',
  'x-github-request-id': '48CDAEA0:14594:611EAE5:56B5153D'
});
}

