(function () {
  'use strict';

  function entry($q, Firebase, auth, user, entriesRef,
      entryRef, userRef) {

    return {

      create: function (data) {
        var defer = $q.defer(),
            ref;

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.reject();
              }

              ref = entriesRef().push();

              ref.set(angular.extend({}, data, {
                author: authData.uid,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                comments: { _: true }
              }), function (err) {
                if (err) {
                  return defer.reject(err);
                }

                userRef(authData.uid).child('entries/' + ref.key())

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

      remove: function (entryId) {
        var defer = $q.defer();

        auth.waitForAuth().then(function (authData) {
          if (!authData) {
            return defer.reject();
          }

          entryRef(entryId).remove(function (err) {
            if (err) {
              return defer.reject(err);
            }

            userRef(authData.uid).child('entries/' + entryId)

                .remove(function () {
                  // Ignore error here
                  defer.resolve();
                });
          });
        });

        return defer.promise;
      },

      byId: function (entryId) {
        var defer = $q.defer();

        entryRef(entryId).once('value', function (snap) {
          defer.resolve(snap.val());
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise.then(function (data) {
          var defer;

          if (!data) {
            return { data: data };
          }

          defer = $q.defer();

          userRef(data.author).once('value', function (snap) {
            defer.resolve({
              data: angular.extend({}, data, { $id: entryId }),
              author: snap.val()
            });
          });

          return defer.promise;
        });
      },

      isAuthor: function (entryId) {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.resolve(null);
              }

              entryRef(entryId).once('value', function (snap) {
                defer.resolve(snap.val().author === authData.uid);
              }, function (err) {
                defer.reject(err);
              });
            });

        return defer.promise;
      }

    };
  }

  entry.$inject = [
    '$q',
    'Firebase',
    'auth',
    'user',
    'entriesRef',
    'entryRef',
    'userRef'
  ];

  angular.module('wordbin.services')

      .factory('entry', entry);

}());
