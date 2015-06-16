(function () {
  'use strict';

  function comments($q, entryRef, commentsRef, commentRef, auth) {

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

      create: function (data) {
        var defer = $q.defer(),
            ref;

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.reject();
              }

              ref = commentsRef().push();

              ref.set(angular.extend({}, data, {
                author: authData.uid,
                timestamp: Firebase.ServerValue.TIMESTAMP
              }), function (err) {
                if (err) {
                  return defer.reject(err);
                }

                entryRef(data.target).child('comments/' + ref.key())

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

      remove: function (commentId) {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              var ref,
                  entryId;

              if (!authData) {
                return defer.reject();
              }

              ref = commentRef(commentId);

              ref.child('target').once('value', function (snap) {
                entryId = snap.val();

                ref.remove(function (err) {
                  if (err) {
                    return defer.reject(err);
                  }

                  entryRef(entryId).child('comments/' + commentId)

                      .remove(function () {
                        // Ignore error here
                        defer.resolve();
                      });
                });
              }, function (err) {
                defer.reject(err);
              });
            });

        return defer.promise;
      },

      isAuthor: function (commentId) {
        var defer = $q.defer();

        auth.waitForAuth()

            .then(function (authData) {
              if (!authData) {
                return defer.resolve(null);
              }

              commentRef(commentId).once('value', function (snap) {
                defer.resolve(snap.val().author === authData.uid);
              }, function (err) {
                defer.reject(err);
              });
            });

        return defer.promise;
      }

    };
  }

  comments.$inject = [
    '$q',
    'entryRef',
    'commentsRef',
    'commentRef',
    'auth'
  ];

  angular.module('wordbin.services')

      .factory('comments', comments);

}());
