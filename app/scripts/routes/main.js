'use strict';

angular.module('gitissuesApp')
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/issues');
    $urlRouterProvider.when('issues/', '/issues');

    $stateProvider
      .state('issues', {
        url: '/issues',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as mainCtrl',
        resolve: {
              /*
              * fetchIssues call from main.service.js
              * before loading the data for main.controller.js , get all the list of issues and pre-populate it before
              * loading the constructor
               */
              // fetchIssues: function() {
              //   return {};
              // }
              fetchIssues : ['mainSvc', 'sharedSvc', function(mainSvc, sharedSvc) {
                var pageNum = 1;
                var state = "all";
                var sortOrder = "created";
                var direction = "desc";

                return mainSvc.fetchIssues(pageNum,sortOrder,state,direction).then(
                  function(response) {
                    return response;
                  },
                  function(errResponse) {
                    sharedSvc.log("Failed to make api call to fetchIssues");
                  }
                )
              }]
        }
      });
  }]);
