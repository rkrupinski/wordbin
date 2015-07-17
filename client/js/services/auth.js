(function () {
  'use strict';

  function auth($injector, $state, authObj, user) {

    return {

      login: function login() {

        return authObj.$authWithOAuthPopup('twitter')

            .then(function () {
              var authData = $injector.get('auth').getAuth();

              user.byUsername(authData.twitter.username)

                  .then(function (data) {
                    if (!data) {
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
      },

      getAuth: function getAuth() {
        return authObj.$getAuth();
      },

      waitForAuth: function waitForAuth() {
        return authObj.$waitForAuth();
      }

    };
  }

  auth.$inject = [
    '$injector',
    '$state',
    'authObj',
    'user'
  ];

  angular.module('wordbin.services')

      .factory('auth', auth);

}());
