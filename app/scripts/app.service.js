'use strict';

/**
 * @ngdoc service
 * @name gitissuesApp.gitIssuesInterceptor
 * @description : interceptor which intercepts every incoming and outgoing XHR calls
 * # gitIssuesInterceptor
 * Factory in the gitissuesApp.
 */
angular.module('gitissuesApp')
  .factory('gitIssuesInterceptor',['$rootScope', function ($rootScope) {
    $rootScope.showIndicator = false;

      return {
        request: function (config) {
          config.headers['Content-Type'] = "application/json";
          config.headers['Accept'] = "application/json";
          //set the spinner
          switch (config.method) {
            case 'GET' :
              $rootScope.showIndicator = true;
              break;
          }

          return config;
        },
        requestError: function (config) {

        },

        response: function (response) {
          $rootScope.showIndicator = false;
          return response;
        },
        responseError: function (rejection) {
          $rootScope.showIndicator = false;
        }

      }
    }]);
