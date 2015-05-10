(function () {
  'use strict';

  function auth($state, $q, authObj, config) {

    return {

      login: function login() {
        return authObj.$authWithOAuthPopup(config.authProvider)

            .then(function (authData) {
              $state.reload();

              return authData;
            });
      },

      logout: function logout() {
        return $q.when()

            .then(function () {
              authObj.$unauth();
              $state.reload();
            });
      },

      isLoggedIn: function isLoggedIn() {
        return !!authObj.$getAuth();
      }

    };
  }

  auth.$inject = [
    '$state',
    '$q',
    'authObj',
    'config'
  ];

  angular.module('wordbin')

    .factory('auth', auth);

}());
