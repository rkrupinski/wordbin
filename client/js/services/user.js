(function () {
  'use strict';

  function user($q, $injector, usersRef, userRef, authObj) {

    return {

      current: function () {

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
              try {
                ret = $injector.get('user').get(authData.twitter.username);
              } catch (err) {
                ret = $q.reject(err);
              }

              break;

          }

          return ret;
        };

      }(),

      get: function (username) {
        var defer = $q.defer();

        usersRef()

            .orderByChild('username')
            .equalTo(username)
            .limitToFirst(1)
            .once('value', function (snap) {
              var data = snap.val();

              defer.resolve(data ? data[Object.keys(data)[0]] : data);
            }, function (err) {
              defer.reject(err);
            });

        return defer.promise;
      },

      create: function (authData) {
        var ref = userRef(authData.uid),
            defer = $q.defer(),
            username,
            data;

        try {

          username = authData.twitter.username;

          data = {
            name: authData.twitter.displayName,
            image: authData.twitter.cachedUserProfile.profile_image_url,
            description: authData.twitter.cachedUserProfile.description
          };

        } catch (err) {

          return defer.reject(err);

        }

        ref.set(data, function (err) {
          if (err) {
            defer.reject(err);
          }

          ref.child('username').setWithPriority(username, 1000, function (err) {
            if (err) {
              defer.reject(err);
            }

            defer.resolve();
          });
        });

        return defer.promise;
      }

    };
  }

  user.$inject = [
    '$q',
    '$injector',
    'usersRef',
    'userRef',
    'authObj'
  ];

  angular.module('wordbin.services')

      .factory('user', user);

}());
