(function () {
  'use strict';

  angular.module('wordbin', [
    'ui.router',
    'ui.bootstrap',
    'firebase'
  ])

    .config(appConfig)

    .config(routesConfig);

  function appConfig($locationProvider, $compileProvider, env) {
    $locationProvider.html5Mode(true);

    if (env === 'prod') {
      $compileProvider.debugInfoEnabled(false);
    }
  }

  appConfig.$inject = [
    '$locationProvider',
    '$compileProvider',
    'env'
  ];

  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider

      .otherwise('/app/home');

    $stateProvider

      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/app.html'
      })

        .state('app.home', {
          url: '/home',
          views: {
            '': {
              templateUrl: 'views/home.html'
            }
          },
          data: {
            meta: {
              title: 'Home'
            }
          }
        });
  }

  routesConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

}());
