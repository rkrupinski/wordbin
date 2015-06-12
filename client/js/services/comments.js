(function () {
  'use strict';

  function comments($q, entryRef, auth) {

    return {

      count: function (entryId) {
        var defer = $q.defer();

        entryRef(entryId).child('comments').once('value', function (snap) {
          defer.resolve(snap.numChildren());
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      },

      create: function () {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.reject();
              }
            });

        return defer.promise;
      }

    };
  }

  comments.$inject = [
    '$q',
    'entryRef',
    'auth'
  ];

  angular.module('wordbin.services')

      .factory('comments', comments);

}());

/*
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
          timestamp: Firebase.ServerValue.TIMESTAMP
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
}
*/