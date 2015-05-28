(function () {
  'use strict';

  function entry($q, Firebase, authObj, user, entriesRef, userRef) {

    return {

      create: function (data) {
        var authData = authObj.$getAuth(),
            defer,
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
      }

    };
  }

  entry.$inject = [
    '$q',
    'Firebase',
    'authObj',
    'user',
    'entriesRef',
    'userRef'
  ];

  angular.module('wordbin.services')

      .factory('entry', entry);

}());
