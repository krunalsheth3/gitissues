'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:gitHeader
 * @description
 * # gitHeader
 */
angular.module('gitissuesApp')
  .directive('gitHeader',['$window', '$state', function ($window, $state) {
    return {
      templateUrl: 'scripts/directives/headers/githeader.view.ng.html',
      restrict: 'AE',
      replace: false,
      link: function postLink(scope, element, attrs) {
        scope.showErrorMessage = false;
        scope.logoURL = "https://avatars.githubusercontent.com/u/4223?v=3";

        scope.navigateToHomepage = function(goToPath) {
          $state.go(goToPath);
        }

        scope.goToGitHub = function() {
          $window.location.href = "https://github.com/";
        }

        /*
         *  Page navigation to home page
         */
        scope.navigateToDefaultPage = function(link) {
          $state.go(link);
        }
      }
    };
  }]);
