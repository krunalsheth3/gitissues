'use strict';

/**
 * @ngdoc service
 * @name gitissuesApp.issuedetails.service
 * @description makes REST API call to fetch details of a specific Issue, comments and returns that using a deferred object
 * # issuedetails.service
 * Factory in the gitissuesApp.
 */
angular.module('gitissuesApp')
  .factory('issuedetailsSvc',['$http', '$q', 'defaultConst', function ($http, $q, defaultConst) {

    // Public API here
    return {
      /*
       * GET
       * fetchIssuesDetails method fetches the details of issues for the given Issue ID
       */
      fetchIssuesDetails : function (issueId) {

        var deferObject = deferObject || $q.defer();

        var req = {
          method: 'GET',
          url: defaultConst.baseUrl+"/issues/"+issueId
        };

        $http(req).then(function successCallBack(response) {
          if(angular.isDefined(response)) {
            deferObject.resolve(response);
          } else {
            deferObject.reject(response);
          }
        }, function errorCallBack(response) {
          deferObject.reject(response);
        })

        return deferObject.promise;

      },

      /*
       * GET
       * fetchCommentsDetails method fetches the comments of issues for the given Issue ID
       */
      fetchCommentsDetails : function (issueId, pageNum) {

        var deferObject = deferObject || $q.defer();

        var req = {
          method: 'GET',
          url: defaultConst.baseUrl+"/issues/"+issueId+"/comments",
          params: {
            page: pageNum,
            per_page: defaultConst.itemsPerPage
          }
        };

        $http(req).then(function successCallBack(response) {
          if(angular.isDefined(response)) {
            deferObject.resolve(response);
          } else {
            deferObject.reject(response);
          }
        }, function errorCallBack(response) {
          deferObject.reject(response);
        })

        return deferObject.promise;

      }

    };

  }]);
