(function () {
  'use strict';

  function CommentFormCtrl($q, user) {
    var self = this;

    this._q = $q;
    this._user = user;

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

  CommentFormCtrl.$inject = [
    '$q',
    'user'
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
