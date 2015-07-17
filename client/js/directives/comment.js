(function () {
  'use strict';

  function CommentCtrl($q, user, comments, through) {
    var self = this;

    this._q = $q;
    this._user = user;
    this._comments = comments;
    this._through = through;

    this.loading = true;

    this._fetchData()

        .then(function (data) {
          self.author = data[0];
          self.isAuthor = data[1];
        })

        .catch(function (err) {
          // TODO:
          console.log(err);
        })

        .finally(function () {
          self.loading = false;
        });
  }

  CommentCtrl.prototype._fetchData = function () {
    return this._q.all([
      this._user.byUid(this.comment.author),
      this._comments.isAuthor(this.comment.$id)
    ]);
  };

  CommentCtrl.prototype.deleteComment = function (e) {
    var self = this;

    e.preventDefault();

    this._through.confirm('Do you want to delete this comment?')

        .then(function () {
          self.loading = true;

          return self._comments.remove(self.comment.$id);
        })

        .catch(function (err) {
          // TODO:
          console.log(err);
        })

        .finally(function () {
          self.loading = false;
        });
  };

  CommentCtrl.$inject = [
    '$q',
    'user',
    'comments',
    'through'
  ];

  function comment() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/comment.html',
      scope: {},
      controller: CommentCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        comment: '=data'
      }
    };
  }

  comment.$inject = [];

  angular.module('wordbin.directives')

      .directive('comment', comment);

}());
