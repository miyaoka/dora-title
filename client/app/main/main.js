'use strict';

angular.module('doraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:msg',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });
  });