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
  })

  /*
   * the html content that the body has been emitted will need to be compiled for angularjs to resolve the click function
   * It basically compiles the links dynamically
   */
  .directive('compile', function($compile) {
    // directive factory creates a link function
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    };
  });
