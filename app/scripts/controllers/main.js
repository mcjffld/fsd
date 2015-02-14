'use strict';

/**
 * @ngdoc function
 * @name fsdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fsdApp
 */
angular.module('fsdApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
