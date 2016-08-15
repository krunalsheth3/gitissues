'use strict';

angular.module('gitissuesApp')
  .config(['$stateProvider', function($stateProvider) {

    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      });
  }]);
