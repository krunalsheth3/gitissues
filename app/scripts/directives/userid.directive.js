'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:userid
 * @description common directive to be used wherever the userID is being referenced to
 * this directive will add a template for userID and a link to the URL which points to the User github profile page
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
      restrict: 'E'
    };
  });
