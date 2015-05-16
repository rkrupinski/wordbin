(function () {
  'use strict';

  function auth($state, authObj, user, config) {

    return {

      login: function login() {

        return authObj.$authWithOAuthPopup(config.authProvider)

            .then(function () {
              var authData = authObj.$getAuth();

              user.exists(authData.uid)

                  .then(function (exists) {
                    if (!exists) {
                      return user.create(authData);
                    }
                  })

                  .catch(function () {
                    authObj.$unauth();
                  })

                  .finally(function () {
                    $state.reload();
                  });
            });
      },

      logout: function logout() {
        authObj.$unauth();

        $state.reload();
      },

      isLoggedIn: function isLoggedIn() {
        return !!authObj.$getAuth();
      }

    };
  }

  auth.$inject = [
    '$state',
    'authObj',
    'user',
    'config'
  ];

  angular.module('wordbin')

    .factory('auth', auth);

}());
