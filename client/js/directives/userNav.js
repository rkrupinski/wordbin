(function () {
  'use strict';

  function userNav(auth, user) {

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

        user.get().then(function (data) {
          scope.user = data;
        });

      }
    };
  }

  userNav.$inject = [
    'auth',
    'user'
  ];

  angular.module('wordbin')

    .directive('userNav', userNav);

}());
