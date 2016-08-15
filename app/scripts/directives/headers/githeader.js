'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:gitHeader
 * @description Generic header directive to be used in the portal
 * # gitHeader
 */
angular.module('gitissuesApp')
  .directive('gitHeader',['$window', '$state', function ($window, $state) {
    return {
      templateUrl: 'scripts/directives/headers/githeader.view.ng.html',
      restrict: 'AE',
      replace: false,
      link: function postLink(scope, element, attrs) {

        scope.goToGitHub = function() {
          $window.location.href = "https://github.com/";
        }

        /*
         *  Page navigation to home page
         */
        scope.navigatePage= function(link) {
          $state.go(link);
        }
      }
    };
  }]);
