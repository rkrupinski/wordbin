(function () {
  'use strict';

  function UserFavoritesCtrl($q, $firebaseArray, userRef, entry) {
    var self = this;

    this._q = $q;
    this._firebaseArray = $firebaseArray;
    this._userRef = userRef;
    this._entry = entry;

    this.loading = true;

    this._fetchData()

      .then(function (data) {
        console.log(data);
        self.entries = data;

        self.loading = false;
      });
  }

  UserFavoritesCtrl.prototype._fetchData = function () {
    var ref = this._userRef(this.userId).child('like'),
        self = this;

    return this._firebaseArray(ref).$loaded()

      .then(function (data) {
        return data.map(function (item) {
          return self._entry.byId(item.$id);
        });
      })

      .then(function (data) {
        return self._q.all(data);
      })

      .then(function (data) {
        return data

            .map(function (item) {
              return item.data;
            })

            .filter(function (item) {
              return !!item;
            });
      });
  };

  UserFavoritesCtrl.$inject = [
    '$q',
    '$firebaseArray',
    'userRef',
    'entry'
  ];

  function userFavorites() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/userEntries.html',
      scope: {},
      controller: UserFavoritesCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        userId: '='
      }
    };
  }

  userFavorites.$inject = [];

  angular.module('wordbin.directives')

      .directive('userFavorites', userFavorites);

}());

/*
function UserEntriesCtrl($firebaseArray, entriesRef) {
  var self = this,
      ref;

  this.loading = true;

  ref = entriesRef()

      .orderByChild('author')
      .equalTo(this.userId);

  $firebaseArray(ref).$loaded()

      .then(function (data) {
        self.entries = data;

        self.loading = false;
      });
}

UserEntriesCtrl.$inject = [
  '$firebaseArray',
  'entriesRef'
];
*/