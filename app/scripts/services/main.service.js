'use strict';

/**
 * @ngdoc service
 * @name gitissuesApp.main
 * @description makes REST API call to fetch list of Issues for a given repository
 * # main
 * Factory in the gitissuesApp.
 */
angular.module('gitissuesApp')
  .factory('mainSvc',['$http', '$q', 'defaultConst', function ($http, $q, defaultConst) {

    // Public API here
    return {
      /*
      * GET
      * fetchIssues method fetches the list of issues for the Ruby repository for the given page Number
       */
      fetchIssues : function (pageNum, sortOrder, state, direction) {
        var deferObject = deferObject || $q.defer();

        var req = {
          method: 'GET',
          url: defaultConst.baseUrl+"/issues",
          params: {
            page: pageNum,
            sort: sortOrder,
            state: state,
            direction: direction,
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
