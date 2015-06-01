(function () {
  'use strict';

  function comments($q, entryRef) {

    return {

      count: function (entryId) {
        var defer = $q.defer();

        entryRef(entryId).child('comments').once('value', function (snap) {
          defer.resolve(snap.numChildren());
        }, function (err) {
          defer.reject(err);
        });

        return defer.promise;
      }

    };
  }

  comments.$inject = [
    '$q',
    'entryRef'
  ];

  angular.module('wordbin.services')

      .factory('comments', comments);

}());
