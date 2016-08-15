'use strict';

/**
 * @ngdoc overview
 * @name gitissuesApp
 * @description
 * # gitissuesApp
 *
 * Main module of the application.
 */
angular
  .module('gitissuesApp', [
    'ngAnimate',
    'ngTouch',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngMaterial'
  ])

  .config(['$urlRouterProvider', '$httpProvider', '$mdThemingProvider', function($urlRouterProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');

    //adding the gitIssuesInterceptor by its name for all incoming and outgoing XHR calls
    $httpProvider.interceptors.push('gitIssuesInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .warnPalette('purple')
      .accentPalette('pink');
  }])

  //Default constants being used throughout the project
  .constant('defaultConst', {
    'baseUrl'       : 'https://api.github.com/repos/rails/rails',
    'currentPage'   : 1,
    'maxPaginationSize': 5,
    'itemsPerPage'   : 25
  })





