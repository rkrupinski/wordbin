(function () {
  'use strict';

  function like($q, entryRef, userRef, auth) {

    return {

      count: function (entryId) {
        var defer = $q.defer();

        entryRef(entryId).child('like')

            .once('value', function (snap) {
              defer.resolve(snap.numChildren());
            }, function (err) {
              defer.reject(err);
            });

        return defer.promise;
      },

      like: function (entryId) {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.reject();
              }

              entryRef(entryId).child('like/' + authData.uid)

                  .set(true, function (err) {
                    if (err) {
                      return defer.reject(err);
                    }

                    userRef(authData.uid).child('like/' + entryId)

                        .set(true, function (err) {
                          if (err) {
                            return defer.reject(err);
                          }

                          defer.resolve();
                        });
                  });
            });

        return defer.promise;
      },

      likes: function (entryId) {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.resolve(null);
              }

              entryRef(entryId).child('like/' + authData.uid)

                  .once('value', function (snap) {
                    defer.resolve(!!snap.val());
                  }, function (err) {
                    defer.reject(err);
                  });

            });

        return defer.promise;
      }

    };
  }

  like.$inject = [
    '$q',
    'entryRef',
    'userRef',
    'auth'
  ];

  angular.module('wordbin.services')

      .factory('like', like);

}());
