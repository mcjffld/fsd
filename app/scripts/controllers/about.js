'use strict';

/**
 * @ngdoc function
 * @name fsdApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fsdApp
 */
angular.module('fsdApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
