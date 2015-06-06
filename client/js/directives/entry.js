(function () {
  'use strict';

  function EntryCtrl($q, $state, auth, user, entry) {
    var self = this;

    this._q = $q;
    this._state = $state;
    this._auth = auth;
    this._user = user;
    this._entry = entry;

    this.isLoggedIn = auth.isLoggedIn();
    this.loading = true;

    this._fetchData()

        .then(function (data) {
          self.author = data[0];
          self.isAuthor = data[1];

          self.loading = false;
        });
  }

  EntryCtrl.prototype._fetchData = function () {
    return this._q.all([
      this._user.byUid(this.entry.author),
      this._entry.isAuthor(this.entry.$id)
    ]);
  };

  EntryCtrl.prototype.deleteEntry = function () {
    var self = this;

    this.loading = true;

    this._entry.remove(this.entry.$id)

        .then(function () {
          return self._user.current();
        })

        .then(function (authorData) {
          self._state.go('app.profile', {
            username: authorData.username
          });
        })

        .catch(function (err) {
          // TODO
          console.log(err);
        });
  };

  EntryCtrl.$inject = [
    '$q',
    '$state',
    'auth',
    'user',
    'entry'
  ];

  function entry() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/entry.html',
      scope: {},
      controller: EntryCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        entry: '=data',
        full: '='
      }
    };
  }

  entry.$inject = [];

  angular.module('wordbin.directives')

      .directive('entry', entry);

}());