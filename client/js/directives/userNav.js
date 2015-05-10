(function () {
  'use strict';

  function userNav(auth) {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/userNav.html',
      link: function (scope) {

        scope.login = function (e) {
          e.preventDefault();

          auth.login();
        };

        scope.logout = function (e) {
          e.preventDefault();

          auth.logout();
        };

        scope.isLoggedIn = auth.isLoggedIn();

      }
    };
  }

  userNav.$inject = [
    'auth'
  ];

  angular.module('wordbin')

    .directive('userNav', userNav);

}());
