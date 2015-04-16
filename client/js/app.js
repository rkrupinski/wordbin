(function () {
  'use strict';

  angular.module('wordbin', [
    'ui.router'
  ])

    .config(appConfig)

    .config(routesConfig);

  function appConfig($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  appConfig.$inject = [
    '$locationProvider'
  ];

  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider

      .otherwise('/app/home');

    $stateProvider

      .state('app', {
        abstract: true,
        url: '/app'
      })

        .state('app.home', {
          url: '/home',
          views: {
            '@': {
              templateUrl: 'views/home.html'
            }
          }
        });
  }

  routesConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

}());
