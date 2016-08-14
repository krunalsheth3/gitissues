'use strict';

/**
 * @ngdoc function
 * @name gitissuesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gitissuesApp
 */
angular.module('gitissuesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
