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
              console.log('No auth');
              ret = $q.reject();
              break;

            case !!cachedUser:
              console.log('Cached user');
              ret = $q.when(cachedUser);
              break;

            default:
              try {

                // Circular dependency -> $injector
                ret = $injector.get('user')

                    .get(authData.twitter.username)
                    .then(function (data) {
                      cachedUser = data;

                      return data;
                    });

              } catch (err) {

                ret = $q.reject(err);

              }
              break;
          }

          return ret;
        };

      }(),

      get: function (username) {
        var defer = $q.defer(),
            ref;

        ref = usersRef()

            .orderByChild('username')
            .equalTo(username)
            .limitToFirst(1);

        ref.once('value', function (snap) {
          var data = snap.val();

          if (!data) {
            // User not found
            return defer.resolve(data);
          }

          ref.once('child_added', function (snap) {
            defer.resolve(snap.val());
          }, function (err) {
            defer.reject(err);
          });
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
