'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:userid
 * @description
 * # userid
 */
angular.module('gitissuesApp')
  .directive('userid', function () {
    return {
      scope: {
        details: '='
      },
      template: '<a ng-href="{{details.user.html_url}}" class="userId">'+
                '<span ng-bind="details.user.login"></span>'+
                '<md-tooltip>View {{details.user.login}}\'s profile </md-tooltip>' +
                '</a>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
