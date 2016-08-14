'use strict';

angular.module('gitissuesApp')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider
      .state('issues-detail', {
        url: '/issues/:issueId',
        templateUrl: 'views/issuedetails.html',
        controller: 'IssuedetailsCtrl as issueDetailsCtrl',
        resolve: {
          /*
           * issueDetails makes a service call to issuedetails.service.js fetchIssueDetails() method
           * before loading the data for issuedetails.controller.js , get all the issue specific details before
           * loading the constructor
           */
          // issueDetails: function () {
          //   return {};
          // }
          issueDetails : ['issuedetailsSvc', 'sharedSvc','$stateParams', function(issuedetailsSvc, sharedSvc, $stateParams) {

            return issuedetailsSvc.fetchIssuesDetails($stateParams.issueId).then(
              function(response) {
                return response;
              },
              function(errResponse) {
                sharedSvc.log("Failed to make api call to fetchIssuesDetails");
              }
            )
          }]

        }
      });
  }]);
