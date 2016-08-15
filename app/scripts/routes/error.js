'use strict';

angular.module('gitissuesApp')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'views/error.html'
      });
  }]);
