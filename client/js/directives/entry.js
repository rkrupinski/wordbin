(function () {
  'use strict';

  function EntryCtrl($q, user, like, comments) {
    var self = this;

    this._q = $q;
    this._user = user;
    this._like = like;
    this._comments = comments;

    this.loading = true;

    this._fetchData()

        .then(function (data) {
          self.author = data[0];
          self.likeCount = data[1];
          self.commentsCount = data[2];

          self.loading = false;
        });
  }

  EntryCtrl.prototype._fetchData = function () {
    return this._q.all([
      this._user.byUid(this.entry.author),
      this._like.count(this.entry.$id),
      this._comments.count(this.entry.$id)
    ]);
  };

  EntryCtrl.$inject = [
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
