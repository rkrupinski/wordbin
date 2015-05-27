(function () {
  'use strict';

  angular.module('wordbin.controllers', []);
  angular.module('wordbin.directives', []);
  angular.module('wordbin.services', []);
  angular.module('wordbin.filters', []);

  angular

      .module('wordbin', [
        'ui.router',
        'ui.bootstrap',
        'firebase',
        'wordbin.controllers',
        'wordbin.directives',
        'wordbin.services',
        'wordbin.filters'
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

      .when('/', '/app/home')
      .when('/app', '/app/home')
      .when('/app/', '/app/home')

      .otherwise('/404');

    $stateProvider

      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html',
        data: {
          meta: {
            title: 'Page not found'
          }
        }
      })

      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/app.html'
      })

        .state('app.home', {
          url: '/home',
          views: {
            '': {
              controller: 'HomeCtrl as ctrl',
              templateUrl: 'views/home.html'
            }
          },
          data: {
            meta: {
              title: 'Home'
            }
          }
        })

        .state('app.profile', {
          url: '/profile/{username}',
          views: {
            '': {
              controller: 'ProfileCtrl as ctrl',
              templateUrl: 'views/profile.html'
            }
          },
          data: {
            meta: {

            }
          },
          resolve: {
            userData: [
              'user',
              '$stateParams',
              function (user, $stateParams) {
                return user.get($stateParams.username);
              }
            ]
          },
          onEnter: [
            '$state',
            'userData',
            function ($state, userData) {
              if (!userData) {
                return $state.go('404');
              }

              $state.transition.then(function (toState) {
                angular.extend(toState.data.meta, {
                  title: userData.name
                });
              });
            }
          ]
        });
  }

  routesConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

}());
