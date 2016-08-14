'use strict';

/**
 * @ngdoc directive
 * @name gitissuesApp.directive:gitFooter
 * @description
 * # gitFooter
 */
angular.module('gitissuesApp')
  .directive('gitFooter', function () {
    return {
      template: '<footer><div layout="row" layout-align="center center"> <div class="row">  <div class="container">  <div class="row">  <div class="col-sm-6"> <a target="_blank" href="https://github.com/" title="GitHub, Inc">GitHub, Inc</a>. All Rights Reserved. </div></footer>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
