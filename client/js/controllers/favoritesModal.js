(function () {
  'use strict';

  function FavoritesModalCtrl($scope, $modalInstance, $firebaseArray,
      entryRef, entryId) {

    var self = this;

    $scope.$on('$stateChangeStart', function () {
      $modalInstance.close();
    });

    this._firebaseArray = $firebaseArray;
    this._entryRef = entryRef;

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

    this.loading = true;
  }

  FavoritesModalCtrl.prototype._fetchData = function (entryId) {
    var ref = this._entryRef(entryId).child('like');

    return this._firebaseArray(ref).$loaded();
  };

  FavoritesModalCtrl.$inject = [
    '$scope',
    '$modalInstance',
    '$firebaseArray',
    'entryRef',
    'entryId'
  ];

  angular.module('wordbin.controllers')

      .controller('FavoritesModalCtrl', FavoritesModalCtrl);

}());
