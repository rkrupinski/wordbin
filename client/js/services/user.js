(function () {
  'use strict';

  function user($q, userRef, authObj) {

    return {

      get: function () {

        var cachedUser;

        return function () {
          var authData = authObj.$getAuth(),
              ret;

          switch (true) {

            case !authData:
              ret = $q.reject();
              break;

            case !!cachedUser:
              ret = $q.when(cachedUser);
              break;

            default:
              ret = loadUser(authData);
              break;
          }

          return ret;
        };

        function loadUser(data) {
          var defer = $q.defer();

          userRef(data.uid).once('value', function (snap) {
            defer.resolve(cachedUser = snap.val());
          });

          return defer.promise;
        }

      }(),

      exists: function (uid) {
        var defer = $q.defer();

        userRef(uid).once('value', function (snap) {
          defer.resolve(!!snap.val());
        });

        return defer.promise;
      },

      create: function (authData) {
        var defer = $q.defer(),
            data;

        try {

          data = {
            username: authData.twitter.username,
            name: authData.twitter.displayName,
            image: authData.twitter.cachedUserProfile.profile_image_url,
            description: authData.twitter.cachedUserProfile.description
          };

        } catch (err) {

          return defer.reject(err);

        }

        userRef(authData.uid).set(data, function (err) {
          if (err) {
            defer.reject(err);
          }

          defer.resolve();
        });

        return defer.promise;
      }

    };
  }

  user.$inject = [
    '$q',
    'userRef',
    'authObj'
  ];

  angular.module('wordbin.services')

      .factory('user', user);

}());
