(function () {
  'use strict';

  function entry($q, Firebase, authObj, user, entriesRef, entryRef, userRef) {
    var authData = authObj.$getAuth();

    return {

      create: function (data) {
        var defer,
            ref;

        if (!authData) {
          return $q.reject();
        }

        defer = $q.defer();
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
              data: data,
              author: snap.val()
            });
          });

          return defer.promise;
        });
      },

      isAuthor: function (entryId) {
        var defer;

        if (!authData) {
          return $q.reject();
        }

        defer = $q.defer();

        entryRef(entryId).once('value', function (snap) {
          defer.resolve(snap.val().author === authData.uid);
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      }

    };
  }

  entry.$inject = [
    '$q',
    'Firebase',
    'authObj',
    'user',
    'entriesRef',
    'entryRef',
    'userRef'
  ];

  angular.module('wordbin.services')

      .factory('entry', entry);

}());
