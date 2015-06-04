(function () {
  'use strict';

  function FavoritesModalCtrl($q, $firebaseArray, entryId, entryRef) {
    var self = this;

    this._q = $q;
    this._firebaseArray = $firebaseArray;
    this._entryRef = entryRef;

    this.loading = true;

    this._fetchData(entryId)

      .then(function (data) {
        self.favorites = data;
      })

      .catch(function (err) {
        // TODO
        console.log(err);
      })

      .finally(function () {
        self.loading = false;
      });
  }

  FavoritesModalCtrl.prototype._fetchData = function (entryId) {
    var ref = this._entryRef(entryId).child('like');

    return this._firebaseArray(ref).$loaded()

        .then(function (data) {
          console.log(data);
        });
  };

  FavoritesModalCtrl.$inject = [
    '$q',
    '$firebaseArray',
    'entryId',
    'entryRef'
  ];

  angular.module('wordbin.controllers')

      .controller('FavoritesModalCtrl', FavoritesModalCtrl);

}());
