(function () {
  'use strict';

  function EntryCtrl($scope, $q, user, like, comments) {
    var self = this,
        watcher;

    this._q = $q;
    this._user = user;
    this._like = like;
    this._comments = comments;

    this.loading = true;

    watcher = $scope.$watch(function () {
      return !!self.entry;
    }, function (val) {
      if (!val) {
        return;
      }

      watcher();
      self._init();
    });
  }

  EntryCtrl.prototype._init = function () {
    var self = this;

    this._q.all([
      this._user.byUid(this.entry.author),
      this._like.count(this.entry.$id),
      this._comments.count(this.entry.$id)
    ])

        .then(function (data) {
          self.author = data[0];
          self.likeCount = data[1];
          self.commentsCount = data[2];
          self.loading = false;
        });
  };

  EntryCtrl.$inject = [
    '$scope',
    '$q',
    'user',
    'like',
    'comments'
  ];

  function entry() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/entry.html',
      scope: {
        entry: '=data',
        full: '='
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
