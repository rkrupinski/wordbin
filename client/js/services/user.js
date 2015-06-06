(function () {
  'use strict';

  function user($q, $injector, usersRef, userRef) {

    return {

      current: function () {
        var authData = $injector.get('auth').getAuth();

        return !authData ? $q.reject() : $injector.get('user')

            .byUid(authData.uid);
      },

      byUsername: function (username) {
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

      byUid: function (uid) {
        var defer = $q.defer();

        userRef(uid).once('value', function (snap) {
          defer.resolve(snap.val());
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
    'userRef'
  ];

  angular.module('wordbin.services')

      .factory('user', user);

}());
