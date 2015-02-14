'use strict';

/**
 * @ngdoc overview
 * @name fsdApp
 * @description
 * # fsdApp
 *
 * Main module of the application.
 */
angular
  .module('fsdApp', [
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
