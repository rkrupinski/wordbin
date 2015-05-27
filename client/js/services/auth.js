(function () {
  'use strict';

  function auth($state, authObj, user) {

    return {

      login: function login() {

        return authObj.$authWithOAuthPopup('twitter')

            .then(function () {
              var authData = authObj.$getAuth();

              user.get(authData.twitter.username)

                  .then(function (data) {
                    if (!data) {
                      console.log('Does not exist. Creating user.');

                      return user.create(authData);
                    }

                    console.log('Exists');
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
    'user'
  ];

  angular.module('wordbin.services')

      .factory('auth', auth);

}());
