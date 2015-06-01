(function () {
  'use strict';

  function EntryCtrl($q, userRef) {
    var self = this;

    this._q = $q;
    this._userRef = userRef;

    this.loading = true;

    this._loadUserData(this.entry.author)

        .then(function (data) {
          self.author = data;
          self.loading = false;
        });
  }

  EntryCtrl.prototype._loadUserData = function (uid) {
    var defer = this._q.defer();

    this._userRef(uid)

        .once('value', function (snap) {
          defer.resolve(snap.val());
        }, function (err) {
          defer.reject(err);
        });

    return defer.promise;
  };

  EntryCtrl.$inject = [
    '$q',
    'userRef'
  ];

  function entry() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/entry.html',
      scope: {
        entry: '=data'
      },
      controller: EntryCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  entry.$inject = [];

  angular.module('wordbin.directives')

      .directive('entry', entry);

}());
