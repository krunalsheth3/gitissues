'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:gitHeader
 * @description
 * # gitHeader
 */
angular.module('gitissuesApp')
  .directive('gitHeader',['$window', '$location', function ($window, $location) {
    return {
      templateUrl: 'scripts/directives/headers/githeader.view.ng.html',
      restrict: 'AE',
      replace: false,
      link: function postLink(scope, element, attrs) {
        scope.showErrorMessage = false;
        scope.logoURL = "https://avatars.githubusercontent.com/u/4223?v=3";

        /*
         *   To toggle the slide Nav in and out
         */
        scope.toggleSidenav = function(menuId) {
          //$mdSidenav(menuId).toggle();
        };

        scope.goToGitHub = function() {
          $window.location.href = "https://github.com/";
        }

        /*
         *  Page navigation to home page
         */
        scope.navigateToDefaultPage = function(link) {
          $location.path(link);
        }
      }
    };
  }]);
