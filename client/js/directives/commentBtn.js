(function () {
  'use strict';

  function CommentBtnCtrl(comments) {
    var self = this;

    this._comments = comments;

    this._fetchData()

        .then(function (data) {
          self.commentsCount = data;
        })

        .catch(function (err) {
          // TODO
          console.log(err);

          self.commentsCount = '?';
        });
  }

  CommentBtnCtrl.prototype._fetchData = function () {
    return this._comments.count(this.entryId);
  };

  CommentBtnCtrl.$inject = [
    'comments'
  ];

  function commentBtn() {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'views/commentBtn.html',
      scope: {},
      controller: CommentBtnCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        entryId: '='
      }
    };
  }

  commentBtn.$inject = [];

  angular.module('wordbin.directives')

      .directive('commentBtn', commentBtn);

}());
