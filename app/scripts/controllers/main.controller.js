'use strict';

/**
 * @ngdoc function
 * @name gitissuesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitissuesApp
 */
angular.module('gitissuesApp')
  .controller('MainCtrl',['mainSvc', 'fetchIssues', 'defaultConst', 'sharedSvc', '$state',
                function (mainSvc, fetchIssues, defaultConst, sharedSvc, $state) {

    var self = this;
    self.itemsPerPage = defaultConst.itemsPerPage;
    self.maxPaginationSize = defaultConst.maxPaginationSize;
    self.currentPage = defaultConst.currentPage;
    self.defaultSortOrder = "created";
    self.state = "all";
    self.direction = "desc";
    self.dateSortText = "Newest";

    self.listOfIssues = fetchIssues.data;
    self.totalItems = sharedSvc.parseLinkHeader(fetchIssues.headers().link) * defaultConst.itemsPerPage;
    //self.totalItems = 1200;
    self.sortReverse = false;

    self.typesOfStates = [
      {name: 'open'},
      {name: 'closed'},
      {name: 'all'}
    ];

    self.typesOfSorting = [
      {name: 'Recently Created', value: 'created'},
      {name: 'Recently updated', value: 'updated'},
      {name: 'Number of comments', value: 'comments'}
    ]

    /*
    * on any kinds of state change trigger the pageChanged fucntion to load new data
     */
    self.onStateChange = function() {
      this.pageChanged(self.current, self.defaultSortOrder, self.state, self.direction)
    }

    /*
    * on Change of date
    */
    self.onDateChange = function () {
      self.sortReverse = !self.sortReverse;
      if(self.sortReverse) {
        self.direction = 'asc';
        self.dateSortText = "Oldest";
      } else {
        self.direction = 'desc';
        self.dateSortText = "Newest";
      }
      this.pageChanged(self.current, self.defaultSortOrder, self.state, self.direction);
    }

    /*
    * Invoked when pagination or dropdown action changesto fetch data for next page
     */
    self.pageChanged = function(page, sort, state, direction) {
      self.currentPage = page;
      self.defaultSortOrder = sort;
      self.state = state;
      self.direction = direction;

      var issuesList = mainSvc.fetchIssues(self.currentPage, self.defaultSortOrder, self.state, self.direction);
      issuesList.then(
        function(response) {
          self.listOfIssues = response.data;
        },
        function(errResponse) {
          self.listOfIssues = {};
          sharedSvc.log("Failed to make api call to fetchIssues");
        }
      )
    };

    /*
    * set color for labels
    */
    self.set_color = function (color) {
      return sharedSvc.setLabelColor(color);
    }

    /*
    * Navigate to issue details page
    */
    self.goToDetailsPage = function(number) {
      $state.go("issues-detail", {issueId: number});
    }

  //    self.listOfIssues = [
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26140",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26140/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26140/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26140/events",
  //     "html_url": "https://github.com/rails/rails/pull/26140",
  //     "id": 170909762,
  //     "number": 26140,
  //     "title": "Fix AR adapter PostgreSQL::OID::Bit #to_s to return a String",
  //     "user": {
  //       "login": "alexcameron89",
  //       "id": 5634381,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/5634381?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/alexcameron89",
  //       "html_url": "https://github.com/alexcameron89",
  //       "followers_url": "https://api.github.com/users/alexcameron89/followers",
  //       "following_url": "https://api.github.com/users/alexcameron89/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/alexcameron89/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/alexcameron89/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/alexcameron89/subscriptions",
  //       "organizations_url": "https://api.github.com/users/alexcameron89/orgs",
  //       "repos_url": "https://api.github.com/users/alexcameron89/repos",
  //       "events_url": "https://api.github.com/users/alexcameron89/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/alexcameron89/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/PostgreSQL",
  //         "name": "PostgreSQL",
  //         "color": "fbca04"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "matthewd",
  //       "id": 1034,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/matthewd",
  //       "html_url": "https://github.com/matthewd",
  //       "followers_url": "https://api.github.com/users/matthewd/followers",
  //       "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //       "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //       "repos_url": "https://api.github.com/users/matthewd/repos",
  //       "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "matthewd",
  //         "id": 1034,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/matthewd",
  //         "html_url": "https://github.com/matthewd",
  //         "followers_url": "https://api.github.com/users/matthewd/followers",
  //         "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //         "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //         "repos_url": "https://api.github.com/users/matthewd/repos",
  //         "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-12T16:31:12Z",
  //     "updated_at": "2016-08-12T17:16:00Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26140",
  //       "html_url": "https://github.com/rails/rails/pull/26140",
  //       "diff_url": "https://github.com/rails/rails/pull/26140.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26140.patch"
  //     },
  //     "body": "**ActiveRecord::ConnectionAdapters::PostgreSQL::OID::Bit** #to_s was passing back an **ActiveRecord::ConnectionAdapters::PostgreSQL::OID::Bit::Data** object rather than a string, and this corrects it. This fixes issue #26137."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26138",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26138/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26138/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26138/events",
  //     "html_url": "https://github.com/rails/rails/pull/26138",
  //     "id": 170873614,
  //     "number": 26138,
  //     "title": "Use inspected value for errors '%{value}' interpolation",
  //     "user": {
  //       "login": "ojab",
  //       "id": 153388,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/153388?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/ojab",
  //       "html_url": "https://github.com/ojab",
  //       "followers_url": "https://api.github.com/users/ojab/followers",
  //       "following_url": "https://api.github.com/users/ojab/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/ojab/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/ojab/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/ojab/subscriptions",
  //       "organizations_url": "https://api.github.com/users/ojab/orgs",
  //       "repos_url": "https://api.github.com/users/ojab/repos",
  //       "events_url": "https://api.github.com/users/ojab/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/ojab/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activemodel",
  //         "name": "activemodel",
  //         "color": "00E5FF"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-12T13:40:42Z",
  //     "updated_at": "2016-08-12T17:25:23Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26138",
  //       "html_url": "https://github.com/rails/rails/pull/26138",
  //       "diff_url": "https://github.com/rails/rails/pull/26138.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26138.patch"
  //     },
  //     "body": "Right now '%{value}' interpolation is not so useful, because there is no way to distinguish Symbol from String and `nil` is not visible at all, for example.\r\nLet's use `value.inspect` to have more usable '%{value}'.\r\n\r\nThe only issue with this change that come to my mind is cases w/ some structure (like Model) that is converted to String in shortened form (i. e. `#<Model:0x007ffa13454a10>`), but I doubt that it's meaningful to have such things in the error messages."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26137",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26137/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26137/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26137/events",
  //     "html_url": "https://github.com/rails/rails/issues/26137",
  //     "id": 170858953,
  //     "number": 26137,
  //     "title": "PostgreSQL OID Bit column type issue on Rails 5",
  //     "user": {
  //       "login": "morgoth",
  //       "id": 10766,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/10766?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/morgoth",
  //       "html_url": "https://github.com/morgoth",
  //       "followers_url": "https://api.github.com/users/morgoth/followers",
  //       "following_url": "https://api.github.com/users/morgoth/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/morgoth/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/morgoth/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/morgoth/subscriptions",
  //       "organizations_url": "https://api.github.com/users/morgoth/orgs",
  //       "repos_url": "https://api.github.com/users/morgoth/repos",
  //       "events_url": "https://api.github.com/users/morgoth/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/morgoth/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/attached%20PR",
  //         "name": "attached PR",
  //         "color": "006b75"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/PostgreSQL",
  //         "name": "PostgreSQL",
  //         "color": "fbca04"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-12T12:18:02Z",
  //     "updated_at": "2016-08-12T17:15:28Z",
  //     "closed_at": null,
  //     "body": "On upgrade to Rails 5, I have issue with Postgres `bit` column type and overwriting reader method\r\nYou can see the issue: https://gist.github.com/morgoth/1d3725b3e73b91e164d5e20a81221e8f\r\n\r\nIt was working fine on Rails 4.2, now it raises:\r\n```\r\nNoMethodError: undefined method `[]' for #<ActiveRecord::ConnectionAdapters::PostgreSQL::OID::Bit::Data:0x00557ede32d2c0>\r\n```\r\n### System configuration\r\n**Rails version**: 5.0.0\r\n\r\n**Ruby version**: 2.3.1\r\n\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26134",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26134/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26134/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26134/events",
  //     "html_url": "https://github.com/rails/rails/issues/26134",
  //     "id": 170815026,
  //     "number": 26134,
  //     "title": "Logging backend being flooded by Rails 5 DebugExceptions",
  //     "user": {
  //       "login": "mattcg",
  //       "id": 282964,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/282964?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/mattcg",
  //       "html_url": "https://github.com/mattcg",
  //       "followers_url": "https://api.github.com/users/mattcg/followers",
  //       "following_url": "https://api.github.com/users/mattcg/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/mattcg/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/mattcg/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/mattcg/subscriptions",
  //       "organizations_url": "https://api.github.com/users/mattcg/orgs",
  //       "repos_url": "https://api.github.com/users/mattcg/repos",
  //       "events_url": "https://api.github.com/users/mattcg/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/mattcg/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actionpack",
  //         "name": "actionpack",
  //         "color": "FFF700"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "vipulnsward",
  //       "id": 567626,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/567626?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/vipulnsward",
  //       "html_url": "https://github.com/vipulnsward",
  //       "followers_url": "https://api.github.com/users/vipulnsward/followers",
  //       "following_url": "https://api.github.com/users/vipulnsward/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/vipulnsward/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/vipulnsward/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/vipulnsward/subscriptions",
  //       "organizations_url": "https://api.github.com/users/vipulnsward/orgs",
  //       "repos_url": "https://api.github.com/users/vipulnsward/repos",
  //       "events_url": "https://api.github.com/users/vipulnsward/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/vipulnsward/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "vipulnsward",
  //         "id": 567626,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/567626?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/vipulnsward",
  //         "html_url": "https://github.com/vipulnsward",
  //         "followers_url": "https://api.github.com/users/vipulnsward/followers",
  //         "following_url": "https://api.github.com/users/vipulnsward/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/vipulnsward/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/vipulnsward/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/vipulnsward/subscriptions",
  //         "organizations_url": "https://api.github.com/users/vipulnsward/orgs",
  //         "repos_url": "https://api.github.com/users/vipulnsward/repos",
  //         "events_url": "https://api.github.com/users/vipulnsward/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/vipulnsward/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 4,
  //     "created_at": "2016-08-12T07:36:09Z",
  //     "updated_at": "2016-08-12T13:10:55Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\n1. Set up Rails application that uses the [gelf-rb](https://rubygems.org/gems/gelf) gem to log to a Graylog backend.\r\n2. Trigger an exception in the application.\r\n\r\n### Expected behavior\r\n\r\nA single message is logged, with the exception.\r\n\r\n### Actual behavior\r\n\r\nHundreds of messages are logged for a single exception, including one for each line of the stack trace.\r\n\r\n### System configuration\r\nRails 5.0.0\r\nRuby 2.3.0"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26132",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26132/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26132/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26132/events",
  //     "html_url": "https://github.com/rails/rails/issues/26132",
  //     "id": 170805860,
  //     "number": 26132,
  //     "title": "active_support/json doesn't handle IO objects correctly",
  //     "user": {
  //       "login": "liudangyi",
  //       "id": 1825485,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1825485?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/liudangyi",
  //       "html_url": "https://github.com/liudangyi",
  //       "followers_url": "https://api.github.com/users/liudangyi/followers",
  //       "following_url": "https://api.github.com/users/liudangyi/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/liudangyi/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/liudangyi/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/liudangyi/subscriptions",
  //       "organizations_url": "https://api.github.com/users/liudangyi/orgs",
  //       "repos_url": "https://api.github.com/users/liudangyi/repos",
  //       "events_url": "https://api.github.com/users/liudangyi/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/liudangyi/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
  //         "name": "activesupport",
  //         "color": "FC9300"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-12T06:16:53Z",
  //     "updated_at": "2016-08-12T13:11:42Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\n```\r\nirb(main):001:0> require 'json'\r\n=> true\r\nirb(main):002:0> STDOUT.to_json\r\n=> \"\\\"#<IO:0x007fcb1189ebd8>\\\"\"\r\nirb(main):003:0> require 'active_support/json'\r\n=> true\r\nirb(main):004:0> STDOUT.to_json\r\nIOError: not opened for reading\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/core_ext/object/json.rb:132:in `each'\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/core_ext/object/json.rb:132:in `to_a'\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/core_ext/object/json.rb:132:in `as_json'\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/json/encoding.rb:33:in `encode'\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/json/encoding.rb:20:in `encode'\r\n\tfrom /Users/Leedy/Developer/github/rails/activesupport/lib/active_support/core_ext/object/json.rb:39:in `to_json'\r\n\tfrom (irb):4\r\n\tfrom /usr/local/bin/irb:11:in `<main>'\r\n```\r\n### Expected behavior\r\n\r\n`to_json` should never fail. \r\n\r\n### Actual behavior\r\n\r\nIt raises an error because `STDOUT.to_a` fails.\r\n\r\n```ruby\r\n# activesupport/lib/active_support/core_ext/object/json.rb\r\nmodule Enumerable\r\n  def as_json(options = nil) #:nodoc:\r\n    to_a.as_json(options)\r\n  end\r\nend\r\n```\r\n### System configuration\r\n\r\n**Rails version**: master (5.1.0.alpha)\r\n\r\n**Ruby version**: 2.3.1p112\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26130",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26130/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26130/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26130/events",
  //     "html_url": "https://github.com/rails/rails/pull/26130",
  //     "id": 170783333,
  //     "number": 26130,
  //     "title": "Drop a temporary table before end of a test case",
  //     "user": {
  //       "login": "yui-knk",
  //       "id": 5356517,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/5356517?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/yui-knk",
  //       "html_url": "https://github.com/yui-knk",
  //       "followers_url": "https://api.github.com/users/yui-knk/followers",
  //       "following_url": "https://api.github.com/users/yui-knk/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/yui-knk/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/yui-knk/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/yui-knk/subscriptions",
  //       "organizations_url": "https://api.github.com/users/yui-knk/orgs",
  //       "repos_url": "https://api.github.com/users/yui-knk/repos",
  //       "events_url": "https://api.github.com/users/yui-knk/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/yui-knk/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/railties",
  //         "name": "railties",
  //         "color": "8BE06E"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "schneems",
  //       "id": 59744,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/schneems",
  //       "html_url": "https://github.com/schneems",
  //       "followers_url": "https://api.github.com/users/schneems/followers",
  //       "following_url": "https://api.github.com/users/schneems/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
  //       "organizations_url": "https://api.github.com/users/schneems/orgs",
  //       "repos_url": "https://api.github.com/users/schneems/repos",
  //       "events_url": "https://api.github.com/users/schneems/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/schneems/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "schneems",
  //         "id": 59744,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/schneems",
  //         "html_url": "https://github.com/schneems",
  //         "followers_url": "https://api.github.com/users/schneems/followers",
  //         "following_url": "https://api.github.com/users/schneems/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
  //         "organizations_url": "https://api.github.com/users/schneems/orgs",
  //         "repos_url": "https://api.github.com/users/schneems/repos",
  //         "events_url": "https://api.github.com/users/schneems/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/schneems/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-12T01:37:37Z",
  //     "updated_at": "2016-08-12T01:38:38Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26130",
  //       "html_url": "https://github.com/rails/rails/pull/26130",
  //       "diff_url": "https://github.com/rails/rails/pull/26130.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26130.patch"
  //     },
  //     "body": ""
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26129",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26129/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26129/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26129/events",
  //     "html_url": "https://github.com/rails/rails/issues/26129",
  //     "id": 170776592,
  //     "number": 26129,
  //     "title": "Preloading STI trough join table applies STI scope to join table and crashes",
  //     "user": {
  //       "login": "tbreier",
  //       "id": 2110273,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/2110273?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/tbreier",
  //       "html_url": "https://github.com/tbreier",
  //       "followers_url": "https://api.github.com/users/tbreier/followers",
  //       "following_url": "https://api.github.com/users/tbreier/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/tbreier/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/tbreier/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/tbreier/subscriptions",
  //       "organizations_url": "https://api.github.com/users/tbreier/orgs",
  //       "repos_url": "https://api.github.com/users/tbreier/repos",
  //       "events_url": "https://api.github.com/users/tbreier/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/tbreier/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-12T00:25:56Z",
  //     "updated_at": "2016-08-12T06:17:27Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\nRun https://gist.github.com/tbreier/67b2fbd6c679ccea3fd847693f96f9b1\r\n\r\nPost 1 <-> n Comment n <-> 1 User (STI) \r\nAnd now try to preload a specific type of users on posts.\r\n\r\n### Expected behavior\r\nIt should preload all users of the specific type on the post records.\r\n\r\n### Actual behavior\r\n\r\n```\r\n  1) Error:\r\nBugTest#test_association_stuff:\r\nActiveRecord::StatementInvalid: SQLite3::SQLException: no such column: users.type: SELECT \"comments\".* FROM \"comments\" WHERE \"users\".\"type\" IN ('OneTypeOfUsers') AND \"comments\".\"post_id\" = 1\r\n```\r\n\r\n### System configuration\r\n***Discovered on:***\r\n**Rails version**:\r\n4.2.1\r\n**Ruby version**:\r\n2.1.2\r\n\r\n***Gist written for:***\r\n**Rails version**:\r\nMaster (5.1.0alpha)\r\n**Ruby version**:\r\n2.3.1"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26126",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26126/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26126/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26126/events",
  //     "html_url": "https://github.com/rails/rails/issues/26126",
  //     "id": 170707219,
  //     "number": 26126,
  //     "title": "ActionDispatch::Routing::RouteSet#url_for doesn't take defaults into consideration",
  //     "user": {
  //       "login": "davidcornu",
  //       "id": 325821,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/325821?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/davidcornu",
  //       "html_url": "https://github.com/davidcornu",
  //       "followers_url": "https://api.github.com/users/davidcornu/followers",
  //       "following_url": "https://api.github.com/users/davidcornu/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/davidcornu/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/davidcornu/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/davidcornu/subscriptions",
  //       "organizations_url": "https://api.github.com/users/davidcornu/orgs",
  //       "repos_url": "https://api.github.com/users/davidcornu/repos",
  //       "events_url": "https://api.github.com/users/davidcornu/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/davidcornu/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actionpack",
  //         "name": "actionpack",
  //         "color": "FFF700"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
  //         "name": "needs feedback",
  //         "color": "ededed"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/routing",
  //         "name": "routing",
  //         "color": "e102d8"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 4,
  //     "created_at": "2016-08-11T17:59:40Z",
  //     "updated_at": "2016-08-12T01:40:58Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\n**Test case:** https://gist.github.com/davidcornu/23ca66e62f34add9bbd4aea49a4eefaf\r\n\r\nGiven the following `config/routes.rb`\r\n\r\n```ruby\r\nRails.application.routes.draw do\r\n  resources :users, path: \"/users/:category\", defaults: { category: \"admins\" }\r\nend\r\n```\r\n\r\nthe path helper works as expected\r\n\r\n```\r\nirb(main):001:0> Rails.application.routes.url_helpers.users_path\r\n=> \"/users/admins\"\r\n```\r\n\r\nbut `ActionDispatch::Routing::RouteSet#url_for` fails to find the route.\r\n\r\n```\r\nirb(main):002:0> Rails.application.routes.url_for(controller: 'users', action: 'index', only_path: true)\r\nActionController::UrlGenerationError: No route matches {:action=>\"index\", :controller=>\"users\"}\r\n```\r\n\r\nThis is happening because [`ActionDispatch::Journey::Formatter#match_route`](https://github.com/rails/rails/blob/b9f71e49ae43c53258da95bda50325a8d0c99a52/actionpack/lib/action_dispatch/journey/formatter.rb#L90) relies on [`ActionDispatch::Journey::Route#score`](https://github.com/rails/rails/blob/b9f71e49ae43c53258da95bda50325a8d0c99a52/actionpack/lib/action_dispatch/journey/route.rb#L98-L106) which uses [`ActionDispatch::Journey::Path::Pattern#required_names`](https://github.com/rails/rails/blob/b9f71e49ae43c53258da95bda50325a8d0c99a52/actionpack/lib/action_dispatch/journey/path/pattern.rb#L52-L54).\r\n\r\nFor that given route, `score` returns `-1` because `category` is a requirement\r\n\r\n```\r\nirb(main):001:0> route = Rails.application.routes.named_routes[\"users\"]\r\n=> #<ActionDispatch::Journey::Route:0x007f81b8c19b48 ...>\r\nirb(main):002:0> route.score(controller: 'users', action: 'index')\r\n=> -1\r\nirb(main):003:0> route.path.required_names\r\n=> [\"category\"]\r\nirb(main):004:0> route.score(controller: 'users', action: 'index', category: 'editors')\r\n=> 5\r\n```\r\n\r\n### Expected behaviour\r\n\r\n`url_for` should have the same behaviour as the route helpers and take the defaults into consideration.\r\n\r\n### System configuration\r\n\r\n```\r\nirb(main):001:0> Rails.version\r\n=> \"5.0.0\"\r\nirb(main):002:0> RUBY_VERSION\r\n=> \"2.3.1\"\r\n```"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26123",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26123/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26123/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26123/events",
  //     "html_url": "https://github.com/rails/rails/issues/26123",
  //     "id": 170678305,
  //     "number": 26123,
  //     "title": "ActionController::Live deadlock on `const_missing` after `SSE#write`",
  //     "user": {
  //       "login": "achinn",
  //       "id": 2071532,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/2071532?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/achinn",
  //       "html_url": "https://github.com/achinn",
  //       "followers_url": "https://api.github.com/users/achinn/followers",
  //       "following_url": "https://api.github.com/users/achinn/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/achinn/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/achinn/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/achinn/subscriptions",
  //       "organizations_url": "https://api.github.com/users/achinn/orgs",
  //       "repos_url": "https://api.github.com/users/achinn/repos",
  //       "events_url": "https://api.github.com/users/achinn/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/achinn/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actionpack",
  //         "name": "actionpack",
  //         "color": "FFF700"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 5,
  //     "created_at": "2016-08-11T15:43:45Z",
  //     "updated_at": "2016-08-12T15:52:53Z",
  //     "closed_at": null,
  //     "body": "I'm seeing a deadlock occur when a constant is being loaded after a call to `SSE#write`. This will only occur when there's some delay between the two.\r\n\r\nIn my exact scenario I'm using `Redis#subscribe` to run a GraphQL query when an event occurs. I was able to distill the issue down to the fact that running the query triggers `const_missing` which causes the deadlock. I created a basic Rails app without the Redis/GraphQL dependencies which reproduces the issue.\r\n\r\nOf note is that if you use Rails `4.2.6` in my example app you don't run into the issue.\r\n\r\n### Steps to reproduce\r\n\r\nhttps://github.com/achinn/ac-live-deadlock\r\n\r\n### Expected behavior\r\n\r\nThe SSE should close at the end of the HTTP request.\r\n\r\n### Actual behavior\r\n\r\nA deadlock occurs when a constant is being loaded.\r\n\r\n### System configuration\r\n**Rails version**: 5.0.0\r\n\r\n**Ruby version**: 2.3.1p112\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26122",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26122/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26122/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26122/events",
  //     "html_url": "https://github.com/rails/rails/issues/26122",
  //     "id": 170672165,
  //     "number": 26122,
  //     "title": "Rails 5 ActiveRecord::Attribute stack level too deep error on save",
  //     "user": {
  //       "login": "johnathanludwig",
  //       "id": 1262078,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1262078?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/johnathanludwig",
  //       "html_url": "https://github.com/johnathanludwig",
  //       "followers_url": "https://api.github.com/users/johnathanludwig/followers",
  //       "following_url": "https://api.github.com/users/johnathanludwig/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/johnathanludwig/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/johnathanludwig/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/johnathanludwig/subscriptions",
  //       "organizations_url": "https://api.github.com/users/johnathanludwig/orgs",
  //       "repos_url": "https://api.github.com/users/johnathanludwig/repos",
  //       "events_url": "https://api.github.com/users/johnathanludwig/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/johnathanludwig/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 0,
  //     "created_at": "2016-08-11T15:19:07Z",
  //     "updated_at": "2016-08-11T15:53:26Z",
  //     "closed_at": null,
  //     "body": "If you make a _lot_ of assignments to an ActiveRecord object, you will get a a `SystemStackError` during save. In our case we are calculating some stats on reports we generate by incrementing various counters. In some cases we have large reports where one field could be incremented more than 10k times.\r\n\r\n### Steps to reproduce\r\n1. Make an assignment on the same attribute of an object at least 10,050 times.\r\n2. Attempt to save the object.\r\n\r\n### Expected behavior\r\nThe object should be saved.\r\n\r\n### Actual behavior\r\nA stack level too deep error is raised. Here is the trace:\r\n\r\n```\r\nSystemStackError: stack level too deep\r\nactiverecord-5.0.0/lib/active_record/attribute.rb:44:in `original_value'\r\nactiverecord-5.0.0/lib/active_record/attribute.rb:44:in `original_value'\r\n... 10027 levels...\r\nactiverecord-5.0.0/lib/active_record/attribute.rb:44:in `original_value'\r\nactiverecord-5.0.0/lib/active_record/attribute.rb:123:in `changed_from_assignment?'\r\nactiverecord-5.0.0/lib/active_record/attribute.rb:55:in `changed?'\r\nactiverecord-5.0.0/lib/active_record/attribute_mutation_tracker.rb:25:in `changed?'\r\nactiverecord-5.0.0/lib/active_record/attribute_mutation_tracker.rb:9:in `block in changed_values'\r\nactiverecord-5.0.0/lib/active_record/attribute_mutation_tracker.rb:8:in `each'\r\nactiverecord-5.0.0/lib/active_record/attribute_mutation_tracker.rb:8:in `each_with_object'\r\nactiverecord-5.0.0/lib/active_record/attribute_mutation_tracker.rb:8:in `changed_values'\r\nactiverecord-5.0.0/lib/active_record/attribute_methods/dirty.rb:83:in `changed_attributes'\r\nactivemodel-5.0.0/lib/active_model/dirty.rb:146:in `changed'\r\nactiverecord-5.0.0/lib/active_record/attribute_methods/dirty.rb:127:in `keys_for_partial_write'\r\nactiverecord-5.0.0/lib/active_record/attribute_methods/dirty.rb:123:in `_create_record'\r\nactiverecord-5.0.0/lib/active_record/callbacks.rb:302:in `block in _create_record'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:126:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:126:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:506:in `block (2 levels) in compile'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:455:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:455:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:101:in `__run_callbacks__'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:750:in `_run_create_callbacks'\r\nactiverecord-5.0.0/lib/active_record/callbacks.rb:302:in `_create_record'\r\nactiverecord-5.0.0/lib/active_record/timestamp.rb:68:in `_create_record'\r\nactiverecord-5.0.0/lib/active_record/persistence.rb:534:in `create_or_update'\r\nactiverecord-5.0.0/lib/active_record/callbacks.rb:298:in `block in create_or_update'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:126:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:126:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:506:in `block (2 levels) in compile'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:455:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:455:in `call'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:101:in `__run_callbacks__'\r\nactivesupport-5.0.0/lib/active_support/callbacks.rb:750:in `_run_save_callbacks'\r\nactiverecord-5.0.0/lib/active_record/callbacks.rb:298:in `create_or_update'\r\nactiverecord-5.0.0/lib/active_record/persistence.rb:125:in `save'\r\nactiverecord-5.0.0/lib/active_record/validations.rb:44:in `save'\r\nactiverecord-5.0.0/lib/active_record/attribute_methods/dirty.rb:22:in `save'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:319:in `block (2 levels) in save'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:395:in `block in with_transaction_returning_status'\r\nactiverecord-5.0.0/lib/active_record/connection_adapters/abstract/database_statements.rb:232:in `block in transaction'\r\nactiverecord-5.0.0/lib/active_record/connection_adapters/abstract/transaction.rb:189:in `within_new_transaction'\r\nactiverecord-5.0.0/lib/active_record/connection_adapters/abstract/database_statements.rb:232:in `transaction'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:211:in `transaction'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:392:in `with_transaction_returning_status'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:319:in `block in save'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:334:in `rollback_active_record_state!'\r\nactiverecord-5.0.0/lib/active_record/transactions.rb:318:in `save'\r\nactiverecord-5.0.0/lib/active_record/suppressor.rb:41:in `save'\r\n```\r\n\r\n### System configuration\r\n**Rails version**: 5.0.0\r\n\r\n**Ruby version**: 2.4.4\r\n\r\n### Test Case\r\n```ruby\r\nbegin\r\n  require \"bundler/inline\"\r\nrescue LoadError => e\r\n  $stderr.puts \"Bundler version 1.10 or later is required. Please update your Bundler\"\r\n  raise e\r\nend\r\n\r\ngemfile(true) do\r\n  source \"https://rubygems.org\"\r\n  gem \"rails\", github: \"rails/rails\"\r\n  gem \"sqlite3\"\r\nend\r\n\r\nrequire \"active_record\"\r\nrequire \"minitest/autorun\"\r\nrequire \"logger\"\r\n\r\n# This connection will do for database-independent bug reports.\r\nActiveRecord::Base.establish_connection(adapter: \"sqlite3\", database: \":memory:\")\r\nActiveRecord::Base.logger = Logger.new(STDOUT)\r\n\r\nActiveRecord::Schema.define do\r\n  create_table :stats, force: true do |t|\r\n    t.integer :count, default: 0\r\n  end\r\nend\r\n\r\nclass Stat < ActiveRecord::Base\r\nend\r\n\r\nclass BugTest < Minitest::Test\r\n  def test_association_stuff\r\n    stat = Stat.new\r\n\r\n    10_050.times { stat.count += 1 }\r\n\r\n    assert stat.save\r\n  end\r\nend\r\n```"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26121",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26121/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26121/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26121/events",
  //     "html_url": "https://github.com/rails/rails/pull/26121",
  //     "id": 170667921,
  //     "number": 26121,
  //     "title": "Fix count which would sometimes force a DISTINCT",
  //     "user": {
  //       "login": "MaxLap",
  //       "id": 894561,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/894561?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/MaxLap",
  //       "html_url": "https://github.com/MaxLap",
  //       "followers_url": "https://api.github.com/users/MaxLap/followers",
  //       "following_url": "https://api.github.com/users/MaxLap/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/MaxLap/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/MaxLap/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/MaxLap/subscriptions",
  //       "organizations_url": "https://api.github.com/users/MaxLap/orgs",
  //       "repos_url": "https://api.github.com/users/MaxLap/repos",
  //       "events_url": "https://api.github.com/users/MaxLap/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/MaxLap/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-11T15:02:18Z",
  //     "updated_at": "2016-08-12T01:32:19Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26121",
  //       "html_url": "https://github.com/rails/rails/pull/26121",
  //       "diff_url": "https://github.com/rails/rails/pull/26121.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26121.patch"
  //     },
  //     "body": "The current behaviour of checking if there is a LEFT OUTER JOIN arel\r\nnode to detect if we are doing eager_loading is wrong. This problem\r\nwasn't frequent before as only some pretty specific cases would add\r\na LEFT OUTER JOIN arel node. However, the recent new feature\r\nleft_outer_joins also add this node and made this problem happen\r\nfrequently.\r\n\r\nSince in the perform_calculation function, we don't have access to\r\neager_loading information, I had to extract the logic for the distinct\r\nout to the calculate method.\r\n\r\nAs I was in the file for left_outer_join tests, I fixed a few that had\r\nbugs and I replaced some that were really weak with something that\r\nwill catch more issues.\r\n\r\nIn relation tests, the first test I changed would have failed if it\r\nhad validated the hash returned by count instead of just checking how\r\nmany pairs were in it. This is because this merge of join currently\r\ntransforms the join node into an outer join node, which then made\r\ncount do a distinct. So before this change, the return was\r\n{1=>1, 4=>1, 5=>1}."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26119",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26119/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26119/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26119/events",
  //     "html_url": "https://github.com/rails/rails/issues/26119",
  //     "id": 170657798,
  //     "number": 26119,
  //     "title": "Action Cable memory leak",
  //     "user": {
  //       "login": "chrismccord",
  //       "id": 576796,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/576796?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chrismccord",
  //       "html_url": "https://github.com/chrismccord",
  //       "followers_url": "https://api.github.com/users/chrismccord/followers",
  //       "following_url": "https://api.github.com/users/chrismccord/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chrismccord/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chrismccord/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chrismccord/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chrismccord/orgs",
  //       "repos_url": "https://api.github.com/users/chrismccord/repos",
  //       "events_url": "https://api.github.com/users/chrismccord/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chrismccord/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actioncable",
  //         "name": "actioncable",
  //         "color": "bfdadc"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "matthewd",
  //       "id": 1034,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/matthewd",
  //       "html_url": "https://github.com/matthewd",
  //       "followers_url": "https://api.github.com/users/matthewd/followers",
  //       "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //       "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //       "repos_url": "https://api.github.com/users/matthewd/repos",
  //       "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "matthewd",
  //         "id": 1034,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/matthewd",
  //         "html_url": "https://github.com/matthewd",
  //         "followers_url": "https://api.github.com/users/matthewd/followers",
  //         "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //         "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //         "repos_url": "https://api.github.com/users/matthewd/repos",
  //         "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-11T14:21:44Z",
  //     "updated_at": "2016-08-11T15:06:57Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\n```console\r\n$ redis-server &\r\n$ git clone git@github.com:chrismccord/channelsac.git\r\n$ cd channelsac/rails\r\n$ bundle\r\n$ bundle exec puma -e production -w 8\r\n```\r\n\r\nNext, visit http://localhost:3000 and refresh the app multiple times. On our hardware, we can watch the memory grow unbounded, as seen here:\r\n\r\n![](http://i.imgur.com/jQOIhkX.gif)\r\n\r\nThis was after an apparent \"warm up\" period where Rails appeared to be lazy loading resources, but the first several dozen page loads shows oddly high memory growth. I wasn't sure if this was lazy loading or puma workers warming up, so it may be benign:\r\n\r\n![](http://i.imgur.com/3EIZjQR.gif)\r\n\r\n\r\nEither way, the memory growth appears to grow unbounded following this high growth period and is never reclaimed.\r\n\r\n### Expected behavior\r\n\r\nThe memory is reclaimed following connection cleanup.\r\n\r\n### Actual behavior\r\n\r\nMemory grows with each new connection and is not reclaimed after connections die.\r\n\r\n### System configuration\r\n\r\n**Rails version**:\r\nObserved on both Rails 5.0.0, and the `5-0-stable` branch containing this patch: \r\nhttps://github.com/rails/rails/pull/25615/files\r\n\r\n**Ruby version**:\r\n2.3.1\r\n\r\n**OS**:\r\nUbuntu 16.04.1 x64\r\n\r\nLet me know If I can provide more information to help diagnose further."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26117",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26117/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26117/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26117/events",
  //     "html_url": "https://github.com/rails/rails/pull/26117",
  //     "id": 170644529,
  //     "number": 26117,
  //     "title": "Make association queries to preparable: Step 1",
  //     "user": {
  //       "login": "kamipo",
  //       "id": 12642,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12642?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/kamipo",
  //       "html_url": "https://github.com/kamipo",
  //       "followers_url": "https://api.github.com/users/kamipo/followers",
  //       "following_url": "https://api.github.com/users/kamipo/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/kamipo/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/kamipo/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/kamipo/subscriptions",
  //       "organizations_url": "https://api.github.com/users/kamipo/orgs",
  //       "repos_url": "https://api.github.com/users/kamipo/repos",
  //       "events_url": "https://api.github.com/users/kamipo/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/kamipo/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "schneems",
  //       "id": 59744,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/schneems",
  //       "html_url": "https://github.com/schneems",
  //       "followers_url": "https://api.github.com/users/schneems/followers",
  //       "following_url": "https://api.github.com/users/schneems/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
  //       "organizations_url": "https://api.github.com/users/schneems/orgs",
  //       "repos_url": "https://api.github.com/users/schneems/repos",
  //       "events_url": "https://api.github.com/users/schneems/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/schneems/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "schneems",
  //         "id": 59744,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/59744?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/schneems",
  //         "html_url": "https://github.com/schneems",
  //         "followers_url": "https://api.github.com/users/schneems/followers",
  //         "following_url": "https://api.github.com/users/schneems/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
  //         "organizations_url": "https://api.github.com/users/schneems/orgs",
  //         "repos_url": "https://api.github.com/users/schneems/repos",
  //         "events_url": "https://api.github.com/users/schneems/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/schneems/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-11T13:22:55Z",
  //     "updated_at": "2016-08-12T01:32:50Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26117",
  //       "html_url": "https://github.com/rails/rails/pull/26117",
  //       "diff_url": "https://github.com/rails/rails/pull/26117.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26117.patch"
  //     },
  //     "body": "Currently association queries cannot be preparable.\r\n\r\n```ruby\r\n  Post.where(author_id: 1).to_a\r\n  # => SELECT \"posts\".* FROM \"posts\" WHERE \"posts\".\"author_id\" = ?  [[\"author_id\", 1]]\r\n\r\n  Post.where(author: 1).to_a\r\n  # => SELECT \"posts\".* FROM \"posts\" WHERE \"posts\".\"author_id\" = 1\r\n```\r\n\r\nTo make association queries to preparable, it should be handled in\r\n`create_binds_for_hash`. This change is a first step for it."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26113",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26113/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26113/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26113/events",
  //     "html_url": "https://github.com/rails/rails/pull/26113",
  //     "id": 170568006,
  //     "number": 26113,
  //     "title": "Use `ActiveRecord::TestCase` rather than `ActiveSupport::TestCase` in AR test cases",
  //     "user": {
  //       "login": "kamipo",
  //       "id": 12642,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12642?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/kamipo",
  //       "html_url": "https://github.com/kamipo",
  //       "followers_url": "https://api.github.com/users/kamipo/followers",
  //       "following_url": "https://api.github.com/users/kamipo/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/kamipo/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/kamipo/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/kamipo/subscriptions",
  //       "organizations_url": "https://api.github.com/users/kamipo/orgs",
  //       "repos_url": "https://api.github.com/users/kamipo/repos",
  //       "events_url": "https://api.github.com/users/kamipo/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/kamipo/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-11T04:23:01Z",
  //     "updated_at": "2016-08-12T01:33:31Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26113",
  //       "html_url": "https://github.com/rails/rails/pull/26113",
  //       "diff_url": "https://github.com/rails/rails/pull/26113.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26113.patch"
  //     },
  //     "body": ""
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26111",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26111/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26111/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26111/events",
  //     "html_url": "https://github.com/rails/rails/issues/26111",
  //     "id": 170533700,
  //     "number": 26111,
  //     "title": "has_many with scope, dependent and foreign_key needs better documentation",
  //     "user": {
  //       "login": "claudiob",
  //       "id": 10076,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/10076?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/claudiob",
  //       "html_url": "https://github.com/claudiob",
  //       "followers_url": "https://api.github.com/users/claudiob/followers",
  //       "following_url": "https://api.github.com/users/claudiob/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/claudiob/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/claudiob/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/claudiob/subscriptions",
  //       "organizations_url": "https://api.github.com/users/claudiob/orgs",
  //       "repos_url": "https://api.github.com/users/claudiob/repos",
  //       "events_url": "https://api.github.com/users/claudiob/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/claudiob/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/docs",
  //         "name": "docs",
  //         "color": "02d7e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
  //         "name": "needs feedback",
  //         "color": "ededed"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 0,
  //     "created_at": "2016-08-10T22:27:01Z",
  //     "updated_at": "2016-08-11T01:36:59Z",
  //     "closed_at": null,
  //     "body": "I found an _unexpected_ behavior in [has_many](http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_many) that I illustrated with a [failing test in a gist](https://gist.github.com/claudiob/545fa683615bbc7cb6d8ddc99c4306c1).\r\n\r\nThe short version is the following. If you have these two models:\r\n\r\n```ruby\r\nclass Post < ActiveRecord::Base\r\n  has_many :comments, -> { where('text is not null') }, dependent: :destroy\r\nend\r\n\r\nclass Comment < ActiveRecord::Base\r\nend\r\n```\r\n\r\nand you call `destroy` on a post, then not all the comments of the post will be destroyed, but only the comments that match the scope  `where('text is not null')`.\r\n\r\nSome people might argue that this is the _expected_ behavior, since the Rails [documentation of has_many](http://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_and_belongs_to_many-label-Scopes) states:\r\n\r\n> You can pass a second argument scope as a callable (i.e. proc or lambda) to retrieve a specific set of records or customize the generated query when you access the associated collection.\r\n\r\nThe problem is that, if `post.destroy` does not delete *all* the comments of post, then some comments might be left in the database without a corresponding post. \r\n\r\nEven worse, if you declared a foreign key between the `comments` table and the `posts` table (which is the common case for references), then you can end up with the following error, which is the result of running the referenced [gist]((https://gist.github.com/claudiob/545fa683615bbc7cb6d8ddc99c4306c1)):\r\n\r\n```sh\r\n# Comment Load (0.2ms)  SELECT \"comments\".* FROM \"comments\" WHERE \"comments\".\"post_id\" = $1 AND (text is not null)  [[\"post_id\", 1]]\r\n# SQL (0.1ms)  DELETE FROM \"comments\" WHERE \"comments\".\"id\" = $1  [[\"id\", 2]]\r\n# SQL (0.6ms)  DELETE FROM \"posts\" WHERE \"posts\".\"id\" = $1  [[\"id\", 1]]\r\n# (0.1ms)  ROLLBACK\r\n\r\nActiveRecord::InvalidForeignKey: PG::ForeignKeyViolation: ERROR:  \r\nupdate or delete on table \"posts\" violates foreign key constraint \"fk_rails_2fd19c0db7\" on table \"comments\"\r\nDETAIL:  Key (id)=(1) is still referenced from table \"comments\".\r\n: DELETE FROM \"posts\" WHERE \"posts\".\"id\" = $1\r\n```\r\n\r\nWhat do you think? Should the documentation be a little more verbose in this case?"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26108",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26108/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26108/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26108/events",
  //     "html_url": "https://github.com/rails/rails/issues/26108",
  //     "id": 170479674,
  //     "number": 26108,
  //     "title": "Decimals set to values over precision and scale get truncated to 0.0",
  //     "user": {
  //       "login": "violetaria",
  //       "id": 8260617,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/8260617?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/violetaria",
  //       "html_url": "https://github.com/violetaria",
  //       "followers_url": "https://api.github.com/users/violetaria/followers",
  //       "following_url": "https://api.github.com/users/violetaria/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/violetaria/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/violetaria/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/violetaria/subscriptions",
  //       "organizations_url": "https://api.github.com/users/violetaria/orgs",
  //       "repos_url": "https://api.github.com/users/violetaria/repos",
  //       "events_url": "https://api.github.com/users/violetaria/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/violetaria/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 0,
  //     "created_at": "2016-08-10T17:59:58Z",
  //     "updated_at": "2016-08-10T17:59:58Z",
  //     "closed_at": null,
  //     "body": "What I'm seeing in Rails 5.0.0 vs previous version of Rails 4.2.1 is that decimal values get truncated once they go over the scale and precision set in the DB.  \r\n\r\n### Steps to reproduce\r\n\r\nCode to reproduce the error\r\n```ruby\r\nbegin\r\n  require \"bundler/inline\"\r\nrescue LoadError => e\r\n  $stderr.puts \"Bundler version 1.10 or later is required. Please update your Bundler\"\r\n  raise e\r\nend\r\n\r\ngemfile(true) do\r\n  source \"https://rubygems.org\"\r\n  gem \"rails\", github: \"rails/rails\"\r\n  gem \"sqlite3\"\r\n  gem 'pry'\r\nend\r\n\r\nrequire \"active_record\"\r\nrequire \"minitest/autorun\"\r\nrequire \"logger\"\r\n\r\n# This connection will do for database-independent bug reports.\r\nActiveRecord::Base.establish_connection(adapter: \"sqlite3\", database: \":memory:\")\r\nActiveRecord::Base.logger = Logger.new(STDOUT)\r\n\r\nActiveRecord::Schema.define do\r\n  create_table :things, force: true do |t|\r\n   t.decimal :price, precision: 4, scale: 4\r\n  end\r\n\r\nend\r\n\r\nclass Thing < ActiveRecord::Base\r\nend\r\n\r\n\r\nclass BugTest < Minitest::Test\r\n  def test_association_stuff\r\n    thing = Thing.create!\r\n    thing.price = 0.0001\r\n\tassert_equal '0.0001', thing.price.to_s\r\n\r\n    thing.price = 0.00001\r\n\tassert_equal '0.00001', thing.price.to_s\r\n  end\r\nend\r\n```\r\n\r\n### Expected behavior\r\n\r\nI have a validation that looks like this which works in previous version of Rails\r\n\r\n`format: { with: /\\A\\d+(?:\\.\\d{0,4})?\\z/ }, numericality: { greater_than_or_equal_to: 0, less_than: 1 }`\r\n\r\nWhen set to `0.0001` everything works as expected, but when set to `0.00001` the validation should fail because it doesn't match the format.\r\n\r\n### Actual behavior\r\n\r\nThe value gets truncated to `0.0` which is making the validation pass.\r\n\r\n### System configuration\r\n**Rails version**: Rails 5.0.0\r\n\r\n**Ruby version**: ruby 2.2.2p95\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26106",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26106/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26106/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26106/events",
  //     "html_url": "https://github.com/rails/rails/issues/26106",
  //     "id": 170460261,
  //     "number": 26106,
  //     "title": "Proposal: decimal field declarations default to scale: 2 in migrations",
  //     "user": {
  //       "login": "BattleBrisket",
  //       "id": 4679818,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/4679818?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/BattleBrisket",
  //       "html_url": "https://github.com/BattleBrisket",
  //       "followers_url": "https://api.github.com/users/BattleBrisket/followers",
  //       "following_url": "https://api.github.com/users/BattleBrisket/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/BattleBrisket/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/BattleBrisket/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/BattleBrisket/subscriptions",
  //       "organizations_url": "https://api.github.com/users/BattleBrisket/orgs",
  //       "repos_url": "https://api.github.com/users/BattleBrisket/repos",
  //       "events_url": "https://api.github.com/users/BattleBrisket/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/BattleBrisket/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 0,
  //     "created_at": "2016-08-10T16:27:24Z",
  //     "updated_at": "2016-08-10T16:27:24Z",
  //     "closed_at": null,
  //     "body": "Given a valid migration, this field declaration:\r\n\r\n```\r\nt.decimal :foobar\r\n```\r\n\r\nIs currently equivalent to \r\n\r\n```\r\nt.decimal :foobar, precision: 10, scale: 0\r\n```\r\n\r\nThis keeps migrations in line with the standard SQL definitions for a `DECIMAL` field, which default to `DECIMAL(10)`, which is equivalent to `DECIMAL(10,0)`\r\n\r\nIf I am defining a `DECIMAL` field I am anticipating fractional values _by rule_. Why should the default behavior assume the opposite and behave like an integer? \r\n\r\nKeeping in line with existing rules \"just because\" is not The Rails Way, which is designed to write beautiful code and make developer's lives easier. \r\n\r\nI therefore propose that we adjust migration behavior for `decimal` field declarations to default to `precision: 10, scale: 2`. \r\n\r\n**Real world result:** I have a Rails 5.0 app with the following migration\r\n\r\n```\r\n    create_table :rate_books do |t|\r\n      t.decimal :ffs_including_all_ime, precision: 10, scale: 2\r\n      t.decimal :ime_phase_out_dollar_amount, precision: 10, scale: 2\r\n      t.decimal :ffs_rate_excluding_phase_out_ime, precision: 10, scale: 2\r\n      t.decimal :pre_aca_rate_excludes_phased_out_ime, precision: 10, scale: 2\r\n      t.decimal :quartile_percent, precision: 5, scale: 4\r\n      t.decimal :bonus_rate, precision: 10, scale: 2\r\n      t.timestamps null: false\r\n    end\r\n```\r\n\r\nI see no reason why this should not read as \r\n\r\n```\r\n    create_table :rate_books do |t|\r\n      t.decimal :ffs_including_all_ime\r\n      t.decimal :ime_phase_out_dollar_amount\r\n      t.decimal :ffs_rate_excluding_phase_out_ime\r\n      t.decimal :pre_aca_rate_excludes_phased_out_ime\r\n      t.decimal :quartile_percent, precision: 5, scale: 4\r\n      t.decimal :bonus_rate\r\n      t.timestamps null: false\r\n    end\r\n```\r\n\r\nThoughts?"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26105",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26105/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26105/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26105/events",
  //     "html_url": "https://github.com/rails/rails/pull/26105",
  //     "id": 170441692,
  //     "number": 26105,
  //     "title": "Specify conditions for ArrayInquirer and StringInquirer [ci skip]",
  //     "user": {
  //       "login": "kyatul",
  //       "id": 3594425,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/3594425?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/kyatul",
  //       "html_url": "https://github.com/kyatul",
  //       "followers_url": "https://api.github.com/users/kyatul/followers",
  //       "following_url": "https://api.github.com/users/kyatul/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/kyatul/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/kyatul/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/kyatul/subscriptions",
  //       "organizations_url": "https://api.github.com/users/kyatul/orgs",
  //       "repos_url": "https://api.github.com/users/kyatul/repos",
  //       "events_url": "https://api.github.com/users/kyatul/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/kyatul/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
  //         "name": "activesupport",
  //         "color": "FC9300"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/docs",
  //         "name": "docs",
  //         "color": "02d7e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "chancancode",
  //       "id": 55829,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/55829?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chancancode",
  //       "html_url": "https://github.com/chancancode",
  //       "followers_url": "https://api.github.com/users/chancancode/followers",
  //       "following_url": "https://api.github.com/users/chancancode/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chancancode/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chancancode/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chancancode/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chancancode/orgs",
  //       "repos_url": "https://api.github.com/users/chancancode/repos",
  //       "events_url": "https://api.github.com/users/chancancode/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chancancode/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "chancancode",
  //         "id": 55829,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/55829?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/chancancode",
  //         "html_url": "https://github.com/chancancode",
  //         "followers_url": "https://api.github.com/users/chancancode/followers",
  //         "following_url": "https://api.github.com/users/chancancode/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/chancancode/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/chancancode/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/chancancode/subscriptions",
  //         "organizations_url": "https://api.github.com/users/chancancode/orgs",
  //         "repos_url": "https://api.github.com/users/chancancode/repos",
  //         "events_url": "https://api.github.com/users/chancancode/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/chancancode/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-10T15:09:49Z",
  //     "updated_at": "2016-08-11T01:34:49Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26105",
  //       "html_url": "https://github.com/rails/rails/pull/26105",
  //       "diff_url": "https://github.com/rails/rails/pull/26105.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26105.patch"
  //     },
  //     "body": "ArrayInquirer and StringInquirer won't be working for contents having whitespaces or special characters. Albiet a simple thing, but it doesn't clicks to reader while going through docs. So adding a line about it explictly, will make things bit clear on first go itself."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26103",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26103/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26103/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26103/events",
  //     "html_url": "https://github.com/rails/rails/pull/26103",
  //     "id": 170383343,
  //     "number": 26103,
  //     "title": "ActiveRecord Transaction on_commit / on_rollback callbacks",
  //     "user": {
  //       "login": "cristianbica",
  //       "id": 150381,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/150381?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/cristianbica",
  //       "html_url": "https://github.com/cristianbica",
  //       "followers_url": "https://api.github.com/users/cristianbica/followers",
  //       "following_url": "https://api.github.com/users/cristianbica/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/cristianbica/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/cristianbica/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/cristianbica/subscriptions",
  //       "organizations_url": "https://api.github.com/users/cristianbica/orgs",
  //       "repos_url": "https://api.github.com/users/cristianbica/repos",
  //       "events_url": "https://api.github.com/users/cristianbica/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/cristianbica/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 13,
  //     "created_at": "2016-08-10T10:23:07Z",
  //     "updated_at": "2016-08-12T16:12:43Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26103",
  //       "html_url": "https://github.com/rails/rails/pull/26103",
  //       "diff_url": "https://github.com/rails/rails/pull/26103.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26103.patch"
  //     },
  //     "body": "This adds on_commit / on_rollback callbacks to ActiveRecord's transactions. The way this works is:\r\n- transactions callbacks are stored on `ActiveRecord::Transaction`\r\n- rollback callbacks are called when the rollback has occurred (in nested transaction callbacks are called when the inner transaction rolls back)\r\n- commit callbacks are called after the actual commit is issued to the database (in nested transactions are called when the outer transaction commits)\r\n- commit callbacks are called immediately when there's no open transactions\r\n- rollback callbacks are ignored when there's no open transaction\r\n\r\nExample:\r\n```ruby\r\nMyModel.transaction do\r\n  MyModel.connection.on_commit do\r\n    # do somthing\r\n  end\r\nend # here it will call the on_commit block\r\n```\r\n\r\nThe use case for this functionality is related to ActiveJob. One of the sources of errors when working with background jobs is that the job is executed before some data is committed to the database as illustrated here #26045 by DHH. While I initially wanted to implement the behavior as DHH suggested I've talked to @matthewd and he gave me a great idea: why don't we defer the job enqueueing until the transaction is committed. But we needed commit/rollback support on transaction so here it is!\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26100",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26100/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26100/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26100/events",
  //     "html_url": "https://github.com/rails/rails/pull/26100",
  //     "id": 170323357,
  //     "number": 26100,
  //     "title": "Pass over changelogs",
  //     "user": {
  //       "login": "vipulnsward",
  //       "id": 567626,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/567626?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/vipulnsward",
  //       "html_url": "https://github.com/vipulnsward",
  //       "followers_url": "https://api.github.com/users/vipulnsward/followers",
  //       "following_url": "https://api.github.com/users/vipulnsward/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/vipulnsward/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/vipulnsward/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/vipulnsward/subscriptions",
  //       "organizations_url": "https://api.github.com/users/vipulnsward/orgs",
  //       "repos_url": "https://api.github.com/users/vipulnsward/repos",
  //       "events_url": "https://api.github.com/users/vipulnsward/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/vipulnsward/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/docs",
  //         "name": "docs",
  //         "color": "02d7e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 0,
  //     "created_at": "2016-08-10T04:04:27Z",
  //     "updated_at": "2016-08-11T01:36:24Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26100",
  //       "html_url": "https://github.com/rails/rails/pull/26100",
  //       "diff_url": "https://github.com/rails/rails/pull/26100.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26100.patch"
  //     },
  //     "body": "r? @rafaelfranca "
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26098",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26098/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26098/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26098/events",
  //     "html_url": "https://github.com/rails/rails/pull/26098",
  //     "id": 170293696,
  //     "number": 26098,
  //     "title": "Make preload query to prepared statements",
  //     "user": {
  //       "login": "kamipo",
  //       "id": 12642,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12642?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/kamipo",
  //       "html_url": "https://github.com/kamipo",
  //       "followers_url": "https://api.github.com/users/kamipo/followers",
  //       "following_url": "https://api.github.com/users/kamipo/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/kamipo/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/kamipo/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/kamipo/subscriptions",
  //       "organizations_url": "https://api.github.com/users/kamipo/orgs",
  //       "repos_url": "https://api.github.com/users/kamipo/repos",
  //       "events_url": "https://api.github.com/users/kamipo/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/kamipo/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "eileencodes",
  //       "id": 1080678,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1080678?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/eileencodes",
  //       "html_url": "https://github.com/eileencodes",
  //       "followers_url": "https://api.github.com/users/eileencodes/followers",
  //       "following_url": "https://api.github.com/users/eileencodes/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/eileencodes/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/eileencodes/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/eileencodes/subscriptions",
  //       "organizations_url": "https://api.github.com/users/eileencodes/orgs",
  //       "repos_url": "https://api.github.com/users/eileencodes/repos",
  //       "events_url": "https://api.github.com/users/eileencodes/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/eileencodes/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "eileencodes",
  //         "id": 1080678,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/1080678?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/eileencodes",
  //         "html_url": "https://github.com/eileencodes",
  //         "followers_url": "https://api.github.com/users/eileencodes/followers",
  //         "following_url": "https://api.github.com/users/eileencodes/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/eileencodes/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/eileencodes/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/eileencodes/subscriptions",
  //         "organizations_url": "https://api.github.com/users/eileencodes/orgs",
  //         "repos_url": "https://api.github.com/users/eileencodes/repos",
  //         "events_url": "https://api.github.com/users/eileencodes/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/eileencodes/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 4,
  //     "created_at": "2016-08-09T23:19:16Z",
  //     "updated_at": "2016-08-11T20:10:14Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26098",
  //       "html_url": "https://github.com/rails/rails/pull/26098",
  //       "diff_url": "https://github.com/rails/rails/pull/26098.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26098.patch"
  //     },
  //     "body": "Currently preload query cannot be prepared statements even if\r\n`prepared_statements: true`. This commit fixes the issue."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26097",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26097/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26097/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26097/events",
  //     "html_url": "https://github.com/rails/rails/pull/26097",
  //     "id": 170290208,
  //     "number": 26097,
  //     "title": "When calling association.find RecordNotFound is now raised with the s…",
  //     "user": {
  //       "login": "Dagnan",
  //       "id": 99890,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/99890?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/Dagnan",
  //       "html_url": "https://github.com/Dagnan",
  //       "followers_url": "https://api.github.com/users/Dagnan/followers",
  //       "following_url": "https://api.github.com/users/Dagnan/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/Dagnan/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/Dagnan/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/Dagnan/subscriptions",
  //       "organizations_url": "https://api.github.com/users/Dagnan/orgs",
  //       "repos_url": "https://api.github.com/users/Dagnan/repos",
  //       "events_url": "https://api.github.com/users/Dagnan/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/Dagnan/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-09T22:54:06Z",
  //     "updated_at": "2016-08-12T18:35:07Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26097",
  //       "html_url": "https://github.com/rails/rails/pull/26097",
  //       "diff_url": "https://github.com/rails/rails/pull/26097.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26097.patch"
  //     },
  //     "body": "### Changelog\r\n\r\n> RecordNotFound raised by association.find exposes `id`, `primary_key` and\r\n>     `model` methods to be consistent with RecordNotFound raised by Record.find.\r\n\r\n### Summary\r\n\r\n`RecordNotFound` reference when doing `Car.find(0)`:\r\n\r\n```\r\n(byebug) exception.inspect\r\n\"#<ActiveRecord::RecordNotFound: Couldn't find Car with 'id'=0>\"\r\n(byebug) exception.id\r\n0\r\n(byebug) exception.primary_key\r\n\"id\"\r\n(byebug) exception.model\r\n\"Car\"\r\n```\r\n\r\nBefore code change when doing `association.find(0)`:\r\n\r\n```\r\n(byebug) exception.inspect\r\n\"#<ActiveRecord::RecordNotFound: Couldn't find Client with 'id'=0 [WHERE \\\"companies\\\".\\\"type\\\" IN ('Client', 'SpecialClient', 'VerySpecialClient') AND \\\"companies\\\".\\\"firm_id\\\" = ? AND \\\"companies\\\".\\\"type\\\" IN ('Client', 'SpecialClient', 'VerySpecialClient')]>\"\r\n(byebug) exception.id\r\nnil\r\n(byebug) exception.model\r\nnil\r\n(byebug) exception.primary_key\r\nnil\r\n```\r\n\r\nAfter code change when doing `association.find(0)`:\r\n\r\n```\r\n(byebug) exception.inspect\r\n\"#<ActiveRecord::RecordNotFound: Couldn't find Client with 'id'=0 [WHERE \\\"companies\\\".\\\"type\\\" IN ('Client', 'SpecialClient', 'VerySpecialClient') AND \\\"companies\\\".\\\"firm_id\\\" = ? AND \\\"companies\\\".\\\"type\\\" IN ('Client', 'SpecialClient', 'VerySpecialClient')]>\"\r\n(byebug) exception.id\r\n0\r\n(byebug) exception.primary_key\r\n\"id\"\r\n(byebug) exception.model\r\n\"Client\"\r\n```"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26096",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26096/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26096/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26096/events",
  //     "html_url": "https://github.com/rails/rails/issues/26096",
  //     "id": 170284861,
  //     "number": 26096,
  //     "title": "merged `where.not` query in scope for has_many returns no relations in rspec tests",
  //     "user": {
  //       "login": "gnfisher",
  //       "id": 4742306,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/4742306?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/gnfisher",
  //       "html_url": "https://github.com/gnfisher",
  //       "followers_url": "https://api.github.com/users/gnfisher/followers",
  //       "following_url": "https://api.github.com/users/gnfisher/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/gnfisher/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/gnfisher/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/gnfisher/subscriptions",
  //       "organizations_url": "https://api.github.com/users/gnfisher/orgs",
  //       "repos_url": "https://api.github.com/users/gnfisher/repos",
  //       "events_url": "https://api.github.com/users/gnfisher/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/gnfisher/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 2,
  //     "created_at": "2016-08-09T22:18:55Z",
  //     "updated_at": "2016-08-12T01:41:12Z",
  //     "closed_at": null,
  //     "body": "First issue raised, excuse me if I do a poor job of this.\r\n\r\nThis is the query in question. It returns the expected records in rails console and in the rails web app. But in rspec tests it always returns an empty ActiveRecord collection.\r\n\r\n```\r\n  has_many :contributorships, dependent: :destroy\r\n  has_many :contributors, source: :user, through: :contributorships, foreign_key: :user_id\r\n\r\n  # Below is the actual query that misbehaves\r\n  has_many :approved_contributors, -> { where(contributorships: { status: 3 }).merge(Contributorship.where.not(referral_type: 'creator')) },\r\n            through: :contributorships,\r\n            class_name: 'User',\r\n            source: :user\r\n```\r\n\r\nIt behaves as expected in Rspec when the merged query is a simple where clause and not a where.not, e.g. `where(contributorships: { status: 3 }).merge(Contributorship.where(referral_type: 'creator'))\r\n`\r\n\r\nHere is my (poorly written) test suite around this:\r\n\r\n```\r\ncontext '#approved_contributors' do\r\n    let!(:idea_proof_point) { FactoryGirl.create(:idea_proof_point) }\r\n    let!(:unapproved_contributor) { FactoryGirl.create(:user) }\r\n        let!(:approved_contributor) { FactoryGirl.create(:user) }\r\n        let!(:creator) { FactoryGirl.create(:user) }\r\n        let!(:approved_contributorship) { FactoryGirl.create(:contributorship, idea_proof_point: idea_proof_point, user: approved_contributor, status: 3) }\r\n        let!(:unapproved_contributorship) { FactoryGirl.create(:contributorship, idea_proof_point: idea_proof_point, user: unapproved_contributor, status: 0) }\r\n        let!(:creator_contributorship) { FactoryGirl.create(:contributorship, idea_proof_point: idea_proof_point, user: creator, status: 3, referral_type: 'creator') }\r\n\r\n    it 'returns approved contributors' do\r\n        expect(idea_proof_point.approved_contributors).to include(approved_contributor)\r\n    end\r\n\r\n    it 'does not return unapproved contributors' do\r\n      expect(idea_proof_point.approved_contributors).not_to include(unapproved_contributor)\r\n    end\r\n\r\n        it 'does not return creator of idea' do\r\n            expect(idea_proof_point.approved_contributors).not_to include(creator)\r\n        end\r\n  end\r\n```\r\n\r\nRspec core sent me to rails for this issue. I'm not sure if I'm missing something in Rspec/Factorygirl that's causing this or if there is an actual bug someplace responsible. \r\n\r\nRails 4.2.6\r\nRuby 2.20"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26094",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26094/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26094/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26094/events",
  //     "html_url": "https://github.com/rails/rails/pull/26094",
  //     "id": 170278399,
  //     "number": 26094,
  //     "title": "Show unpermitted parameters as symbols in logs (so they could be copy…",
  //     "user": {
  //       "login": "igorkasyanchuk",
  //       "id": 11101,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/11101?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/igorkasyanchuk",
  //       "html_url": "https://github.com/igorkasyanchuk",
  //       "followers_url": "https://api.github.com/users/igorkasyanchuk/followers",
  //       "following_url": "https://api.github.com/users/igorkasyanchuk/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/igorkasyanchuk/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/igorkasyanchuk/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/igorkasyanchuk/subscriptions",
  //       "organizations_url": "https://api.github.com/users/igorkasyanchuk/orgs",
  //       "repos_url": "https://api.github.com/users/igorkasyanchuk/repos",
  //       "events_url": "https://api.github.com/users/igorkasyanchuk/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/igorkasyanchuk/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actionpack",
  //         "name": "actionpack",
  //         "color": "FFF700"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "eileencodes",
  //       "id": 1080678,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1080678?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/eileencodes",
  //       "html_url": "https://github.com/eileencodes",
  //       "followers_url": "https://api.github.com/users/eileencodes/followers",
  //       "following_url": "https://api.github.com/users/eileencodes/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/eileencodes/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/eileencodes/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/eileencodes/subscriptions",
  //       "organizations_url": "https://api.github.com/users/eileencodes/orgs",
  //       "repos_url": "https://api.github.com/users/eileencodes/repos",
  //       "events_url": "https://api.github.com/users/eileencodes/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/eileencodes/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "eileencodes",
  //         "id": 1080678,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/1080678?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/eileencodes",
  //         "html_url": "https://github.com/eileencodes",
  //         "followers_url": "https://api.github.com/users/eileencodes/followers",
  //         "following_url": "https://api.github.com/users/eileencodes/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/eileencodes/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/eileencodes/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/eileencodes/subscriptions",
  //         "organizations_url": "https://api.github.com/users/eileencodes/orgs",
  //         "repos_url": "https://api.github.com/users/eileencodes/repos",
  //         "events_url": "https://api.github.com/users/eileencodes/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/eileencodes/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-09T21:43:07Z",
  //     "updated_at": "2016-08-09T23:11:32Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26094",
  //       "html_url": "https://github.com/rails/rails/pull/26094",
  //       "diff_url": "https://github.com/rails/rails/pull/26094.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26094.patch"
  //     },
  //     "body": "### Summary\r\n\r\nVery often during development we need to add permitted parameters to the controller. Currently we can see in logs something like: `Unpermitted parameters: avatar_cache, top_weekly_digest_email, improve_profile_email, statistics_email`. When developer see such error, usually he is copying string of parameters from console and then adding \":\".\r\n\r\nSo the idea of this PR is to copy-paste string with already provided \":\".\r\n"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26093",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26093/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26093/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26093/events",
  //     "html_url": "https://github.com/rails/rails/pull/26093",
  //     "id": 170260208,
  //     "number": 26093,
  //     "title": "load only changed locale files when updated",
  //     "user": {
  //       "login": "wjordan",
  //       "id": 56541,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/56541?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/wjordan",
  //       "html_url": "https://github.com/wjordan",
  //       "followers_url": "https://api.github.com/users/wjordan/followers",
  //       "following_url": "https://api.github.com/users/wjordan/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/wjordan/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/wjordan/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/wjordan/subscriptions",
  //       "organizations_url": "https://api.github.com/users/wjordan/orgs",
  //       "repos_url": "https://api.github.com/users/wjordan/repos",
  //       "events_url": "https://api.github.com/users/wjordan/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/wjordan/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activesupport",
  //         "name": "activesupport",
  //         "color": "FC9300"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "senny",
  //       "id": 5402,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/5402?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/senny",
  //       "html_url": "https://github.com/senny",
  //       "followers_url": "https://api.github.com/users/senny/followers",
  //       "following_url": "https://api.github.com/users/senny/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/senny/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/senny/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/senny/subscriptions",
  //       "organizations_url": "https://api.github.com/users/senny/orgs",
  //       "repos_url": "https://api.github.com/users/senny/repos",
  //       "events_url": "https://api.github.com/users/senny/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/senny/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "senny",
  //         "id": 5402,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/5402?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/senny",
  //         "html_url": "https://github.com/senny",
  //         "followers_url": "https://api.github.com/users/senny/followers",
  //         "following_url": "https://api.github.com/users/senny/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/senny/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/senny/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/senny/subscriptions",
  //         "organizations_url": "https://api.github.com/users/senny/orgs",
  //         "repos_url": "https://api.github.com/users/senny/repos",
  //         "events_url": "https://api.github.com/users/senny/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/senny/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-09T20:17:15Z",
  //     "updated_at": "2016-08-10T18:10:28Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26093",
  //       "html_url": "https://github.com/rails/rails/pull/26093",
  //       "diff_url": "https://github.com/rails/rails/pull/26093.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26093.patch"
  //     },
  //     "body": "### Summary\r\n\r\nIn Rails projects with large sets of localized strings, the amount of time to reload the entire set of translations following `I18n.reload!` can grow quite large. In development (or when `cache_classes` is `false`), `I18n.reload!` is called on the next page load, causing all translations in the entire `load_path` to be reloaded whenever any single file is modified. (In my use case, a full `I18n.reload!` could take ~10-20 seconds, and changes to translation files could happen multiple times per minute.)\r\n\r\nThis PR optimizes the i18n auto-reloading performance by adjusting the `FileUpdateChecker` hook configured by the i18n railtie to call `I18n.backend.load_translations(files)`, only reloading the (much smaller) set of translation files that have actually been changed.\r\n\r\n### Other Information\r\n\r\nIn order to make this optimization possible, this PR adjusts the `FileUpdateChecker` API in a backwards-compatible way to allow an optional single parameter to the `execute` block containing the set of files that were changed. (The block parameter is made optional by only passing it when `block.arity == 1`).\r\n\r\nThis changes the behavior slightly in the case of deleted translations (which will remain loaded until `I18n.reload!` is manually invoked), but considering the auto-reloading feature is most useful for quick iterations in development, I think the change in behavior is worth the added performance gain."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26089",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26089/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26089/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26089/events",
  //     "html_url": "https://github.com/rails/rails/pull/26089",
  //     "id": 170061286,
  //     "number": 26089,
  //     "title": "Sqlite3 Migration Error Fixed (issue #26087)",
  //     "user": {
  //       "login": "travisoneill",
  //       "id": 17502258,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17502258?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/travisoneill",
  //       "html_url": "https://github.com/travisoneill",
  //       "followers_url": "https://api.github.com/users/travisoneill/followers",
  //       "following_url": "https://api.github.com/users/travisoneill/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/travisoneill/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/travisoneill/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/travisoneill/subscriptions",
  //       "organizations_url": "https://api.github.com/users/travisoneill/orgs",
  //       "repos_url": "https://api.github.com/users/travisoneill/repos",
  //       "events_url": "https://api.github.com/users/travisoneill/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/travisoneill/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "matthewd",
  //       "id": 1034,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/matthewd",
  //       "html_url": "https://github.com/matthewd",
  //       "followers_url": "https://api.github.com/users/matthewd/followers",
  //       "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //       "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //       "repos_url": "https://api.github.com/users/matthewd/repos",
  //       "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "matthewd",
  //         "id": 1034,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/1034?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/matthewd",
  //         "html_url": "https://github.com/matthewd",
  //         "followers_url": "https://api.github.com/users/matthewd/followers",
  //         "following_url": "https://api.github.com/users/matthewd/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/matthewd/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/matthewd/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/matthewd/subscriptions",
  //         "organizations_url": "https://api.github.com/users/matthewd/orgs",
  //         "repos_url": "https://api.github.com/users/matthewd/repos",
  //         "events_url": "https://api.github.com/users/matthewd/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/matthewd/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 16,
  //     "created_at": "2016-08-09T01:16:22Z",
  //     "updated_at": "2016-08-12T01:30:37Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26089",
  //       "html_url": "https://github.com/rails/rails/pull/26089",
  //       "diff_url": "https://github.com/rails/rails/pull/26089.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26089.patch"
  //     },
  //     "body": "### Summary\r\n\r\nFixed error in issue #26087\r\n\r\n### Other Information\r\n\r\nError seems to be coming from an undefined method error when 'type' = nil on line 306:\r\n    type = type.to_sym\r\n\r\nChanged to the following to handle nil case\r\n    type = type&.to_sym || :placeholder\r\n\r\nSqlite3 test suite runs with 0 errors and 3 skips (same as when run on unmodified code)"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26087",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26087/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26087/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26087/events",
  //     "html_url": "https://github.com/rails/rails/issues/26087",
  //     "id": 170057671,
  //     "number": 26087,
  //     "title": "Sqlite3 Migration & Rollback Error Handling With Invalid Column Type",
  //     "user": {
  //       "login": "travisoneill",
  //       "id": 17502258,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17502258?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/travisoneill",
  //       "html_url": "https://github.com/travisoneill",
  //       "followers_url": "https://api.github.com/users/travisoneill/followers",
  //       "following_url": "https://api.github.com/users/travisoneill/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/travisoneill/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/travisoneill/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/travisoneill/subscriptions",
  //       "organizations_url": "https://api.github.com/users/travisoneill/orgs",
  //       "repos_url": "https://api.github.com/users/travisoneill/repos",
  //       "events_url": "https://api.github.com/users/travisoneill/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/travisoneill/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/attached%20PR",
  //         "name": "attached PR",
  //         "color": "006b75"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 1,
  //     "created_at": "2016-08-09T00:40:01Z",
  //     "updated_at": "2016-08-09T01:24:18Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\nUse Sqlite3 and create a table.  Add a column to the table with an invalid type argument.  The migration will run successfully.  Notice that 'db/schema.rb' will not work.  Run rake db:rollback, or generate a new migration to remove this column, and it will throw an error.  Code to reproduce the error:  \r\n```Ruby\r\nbegin\r\n  require \"bundler/inline\"\r\nrescue LoadError => e\r\n  $stderr.puts \"Bundler version 1.10 or later is required. Please update your Bundler\"\r\n  raise e\r\nend\r\n\r\ngemfile(true) do\r\n  source \"https://rubygems.org\"\r\n  # Activate the gem you are reporting the issue against.\r\n  gem \"activerecord\", \"5.0.0\"\r\n  gem \"sqlite3\"\r\nend\r\n\r\nrequire \"active_record\"\r\nrequire \"minitest/autorun\"\r\nrequire \"logger\"\r\n\r\n# Ensure backward compatibility with Minitest 4\r\nMinitest::Test = MiniTest::Unit::TestCase unless defined?(Minitest::Test)\r\n\r\n# This connection will do for database-independent bug reports.\r\nActiveRecord::Base.establish_connection(adapter: \"sqlite3\", database: \":memory:\")\r\nActiveRecord::Base.logger = Logger.new(STDOUT)\r\n\r\nActiveRecord::Schema.define do\r\n  create_table :stuff, force: true do |t|\r\n    t.integer :number\r\n    t.string :string\r\n  end\r\n  add_column :stuff, :foo, :bar\r\nend\r\n\r\nclass BugTest < Minitest::Test\r\n  def test_rollback_issue\r\n    ActiveRecord::Schema.define do\r\n      remove_column :stuff, :foo, :bar\r\n    end\r\n  end\r\nend  \r\n```\r\n\r\n### Expected behavior\r\nRails should either catch the bad column type on the initial addition of the column or it should defer to the DB for error handling (as I expect it has been designed to do).  However if the DB allows this to be rolled back,  Rails should not prevent this.\r\n\r\n### Actual behavior\r\nRails throws an error on rollback attempt in what appears to be the schema generation process and the change is not made.  The only solution seems to be to drop the table. \r\n\r\n### System configuration\r\n**Rails version**:  5.1.0.alpha (also tested in 5.0.0 and 4.2.6)\r\n\r\n**Ruby version**: 2.3.1p112"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26085",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26085/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26085/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26085/events",
  //     "html_url": "https://github.com/rails/rails/issues/26085",
  //     "id": 170046622,
  //     "number": 26085,
  //     "title": "NumericalityValidator fails on equal decimal to decimal comparisons",
  //     "user": {
  //       "login": "diminish7",
  //       "id": 29417,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/29417?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/diminish7",
  //       "html_url": "https://github.com/diminish7",
  //       "followers_url": "https://api.github.com/users/diminish7/followers",
  //       "following_url": "https://api.github.com/users/diminish7/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/diminish7/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/diminish7/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/diminish7/subscriptions",
  //       "organizations_url": "https://api.github.com/users/diminish7/orgs",
  //       "repos_url": "https://api.github.com/users/diminish7/repos",
  //       "events_url": "https://api.github.com/users/diminish7/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/diminish7/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activemodel",
  //         "name": "activemodel",
  //         "color": "00E5FF"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/With%20reproduction%20steps",
  //         "name": "With reproduction steps",
  //         "color": "009800"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 10,
  //     "created_at": "2016-08-08T23:07:32Z",
  //     "updated_at": "2016-08-09T19:41:47Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\nMigration:\r\n```ruby\r\ncreate_table :number_ranges do |t|\r\n  t.decimal :low\r\n  t.decimal :high\r\nend\r\n```\r\nModel:\r\n```ruby\r\nclass NumberRange < ApplicationRecord\r\n  validates :high, numericality: { greater_than_or_equal_to: :low }\r\nend\r\n```\r\n\r\nSpec:\r\n```ruby\r\ndescribe NumberRange do\r\n  describe \"#high :greater_than_or_equal_to :low validation\" do\r\n    it \"is valid with equal high and low\" do\r\n      # This fails because the validator compares Float('65.6') to BigDecimal('65.6')\r\n      expect(FinalCost.new(low: '65.6', high: '65.6').to be_valid\r\n    end\r\n  end\r\nend\r\n```\r\n### Expected behavior\r\nWhen validating numericality's `greater_than_or_equal_to` on a decimal column against the value of another decimal column, two equal raw values ought to validate correctly.\r\n\r\n### Actual behavior\r\n`NumericalityValidator#parse_raw_value_as_a_number` always parses with `Kernel.Float(raw_value)`, so the validated value is a float, while the comparison value is a `BigDecimal`, and so, due to precision differences, equal numbers will fail validation.\r\n\r\n### System configuration\r\n**Rails version**:\r\n`5.0.0` (verified on current master as well)\r\n\r\n**Ruby version**:\r\n`2.3.1p112`"
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26083",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26083/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26083/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26083/events",
  //     "html_url": "https://github.com/rails/rails/issues/26083",
  //     "id": 169998717,
  //     "number": 26083,
  //     "title": "Non-html format rendering html view",
  //     "user": {
  //       "login": "bboe",
  //       "id": 48100,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/48100?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/bboe",
  //       "html_url": "https://github.com/bboe",
  //       "followers_url": "https://api.github.com/users/bboe/followers",
  //       "following_url": "https://api.github.com/users/bboe/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/bboe/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/bboe/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/bboe/subscriptions",
  //       "organizations_url": "https://api.github.com/users/bboe/orgs",
  //       "repos_url": "https://api.github.com/users/bboe/repos",
  //       "events_url": "https://api.github.com/users/bboe/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/bboe/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/actionpack",
  //         "name": "actionpack",
  //         "color": "FFF700"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": null,
  //     "assignees": [
  //
  //     ],
  //     "milestone": null,
  //     "comments": 7,
  //     "created_at": "2016-08-08T19:00:32Z",
  //     "updated_at": "2016-08-10T11:44:50Z",
  //     "closed_at": null,
  //     "body": "### Steps to reproduce\r\n\r\n1. Create a new rails 5 project. `rails new bug`\r\n2. Generate a scaffold for welcome. `rails generate scaffold welcome`\r\n3. Migrate, and run development server `rails db:migrate; rails s`\r\n4. Confirm that http://localhost:3000/welcomes.xml raises `ActionController::UnknownFormat`\r\n3. Rename index.html.erb for the welcomes view to index.html. `mv app/views/welcomes/index.html.erb app/views/welcomes/index.html`\r\n4. Run development server. `rails s`\r\n5. Visit http://localhost:3000/welcomes.xml\r\n\r\n### Expected behavior\r\nAn `ActionController::UnknownFormat` exception should occur, which in production mode results in a 406.\r\n\r\n### Actual behavior\r\nThe index.html view is rendered with a 200 status code (the browser complains about invalid xml).\r\n\r\n### System configuration\r\n**Rails version**:\r\n5.0.0\r\n\r\n**Ruby version**:\r\n2.3.0\r\n\r\n### Additional Information\r\n\r\nWith rails 4.2.7 an `ActionView::MissingTemplate` is raised. Thus, unless this is expected behavior with rails 5, it would seem to be a bug. The behavior certainly caught me off-guard, is not intuitive, and took longer than I would like to admit to discover that the lack of the `.erb` suffix was the culprit."
  //   },
  //   {
  //     "url": "https://api.github.com/repos/rails/rails/issues/26079",
  //     "repository_url": "https://api.github.com/repos/rails/rails",
  //     "labels_url": "https://api.github.com/repos/rails/rails/issues/26079/labels{/name}",
  //     "comments_url": "https://api.github.com/repos/rails/rails/issues/26079/comments",
  //     "events_url": "https://api.github.com/repos/rails/rails/issues/26079/events",
  //     "html_url": "https://github.com/rails/rails/pull/26079",
  //     "id": 169817701,
  //     "number": 26079,
  //     "title": "Quoting booleans should return a quoted value",
  //     "user": {
  //       "login": "kamipo",
  //       "id": 12642,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12642?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/kamipo",
  //       "html_url": "https://github.com/kamipo",
  //       "followers_url": "https://api.github.com/users/kamipo/followers",
  //       "following_url": "https://api.github.com/users/kamipo/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/kamipo/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/kamipo/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/kamipo/subscriptions",
  //       "organizations_url": "https://api.github.com/users/kamipo/orgs",
  //       "repos_url": "https://api.github.com/users/kamipo/repos",
  //       "events_url": "https://api.github.com/users/kamipo/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/kamipo/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "labels": [
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
  //         "name": "activerecord",
  //         "color": "0b02e1"
  //       },
  //       {
  //         "url": "https://api.github.com/repos/rails/rails/labels/MySQL",
  //         "name": "MySQL",
  //         "color": "fef2c0"
  //       }
  //     ],
  //     "state": "open",
  //     "locked": false,
  //     "assignee": {
  //       "login": "rafaelfranca",
  //       "id": 47848,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/rafaelfranca",
  //       "html_url": "https://github.com/rafaelfranca",
  //       "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //       "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //       "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //       "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //       "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "assignees": [
  //       {
  //         "login": "rafaelfranca",
  //         "id": 47848,
  //         "avatar_url": "https://avatars.githubusercontent.com/u/47848?v=3",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/rafaelfranca",
  //         "html_url": "https://github.com/rafaelfranca",
  //         "followers_url": "https://api.github.com/users/rafaelfranca/followers",
  //         "following_url": "https://api.github.com/users/rafaelfranca/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/rafaelfranca/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/rafaelfranca/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/rafaelfranca/subscriptions",
  //         "organizations_url": "https://api.github.com/users/rafaelfranca/orgs",
  //         "repos_url": "https://api.github.com/users/rafaelfranca/repos",
  //         "events_url": "https://api.github.com/users/rafaelfranca/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/rafaelfranca/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "milestone": null,
  //     "comments": 3,
  //     "created_at": "2016-08-07T21:40:13Z",
  //     "updated_at": "2016-08-08T11:15:57Z",
  //     "closed_at": null,
  //     "pull_request": {
  //       "url": "https://api.github.com/repos/rails/rails/pulls/26079",
  //       "html_url": "https://github.com/rails/rails/pull/26079",
  //       "diff_url": "https://github.com/rails/rails/pull/26079.diff",
  //       "patch_url": "https://github.com/rails/rails/pull/26079.patch"
  //     },
  //     "body": "Quoting booleans returns a quoted value in postgresql and sqlite3\r\nadapters. But mysql2 adapter does not return a quoted value without\r\nserialized by a string type. This commit fixes the inconsistent\r\nbehavior."
  //   }
  // ]

  }])


