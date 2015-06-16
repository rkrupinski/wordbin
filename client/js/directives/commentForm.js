(function () {
  'use strict';

  function CommentFormCtrl($q, comments, user, auth) {
    var self = this;

    this._q = $q;
    this._comments = comments;
    this._user = user;

    this.disableSubmit = false;
    this.isLoggedIn = auth.isLoggedIn();

    if (!this.isLoggedIn) {
      return;
    }

    this._fetchData()

        .then(function (data) {
          self.author = data[0];
        })

        .catch(function (err) {
          // TODO
          console.log(err);
        });
  }

  CommentFormCtrl.prototype._fetchData = function () {
    return this._q.all([
      this._user.current()
    ]);
  };

  CommentFormCtrl.prototype.postComment = function (e) {
    var self = this;

    e.preventDefault();

    this.disableSubmit = true;

    this._comments.create(angular.extend({}, this.comment, {
      target: this.entryId
    }))

        .then(function () {
          delete self.comment.body;
        })

        .catch(function (err) {
          // TODO
          console.log(err);
        })

        .finally(function () {
          self.disableSubmit = false;
        });
  };

  CommentFormCtrl.$inject = [
    '$q',
    'comments',
    'user',
    'auth'
  ];

  function commentForm() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/commentForm.html',
      scope: {},
      controller: CommentFormCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        entryId: '='
      }
    };
  }

  commentForm.$inject = [];

  angular.module('wordbin.directives')

      .directive('commentForm', commentForm);

}());
