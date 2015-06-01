(function () {
  'use strict';

  function LikeBtnCtrl($q, like, entry, auth) {
    var self = this;

    this.likeCount = 0;
    this.likes = true;
    this.isAuthor = true;
    this.isLoggedIn = auth.isLoggedIn();

    this._like = like;

    $q.all([
      like.count(this.entryId),
      like.likes(this.entryId),
      entry.isAuthor(this.entryId)
    ])

        .then(function (data) {
          self.likeCount = data[0];
          self.likes = data[1];
          self.isAuthor = data[2];
        });
  }

  LikeBtnCtrl.prototype.like = function () {
    var self = this;

    this._like.like(this.entryId)

        .then(function () {
          self.likes = true;
          self.likeCount++;
        });
  };

  LikeBtnCtrl.$inject = [
    '$q',
    'like',
    'entry',
    'auth'
  ];

  function likeBtn() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/likeBtn.html',
      scope: {
        entryId: '='
      },
      controller: LikeBtnCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  likeBtn.$inject = [];

  angular.module('wordbin.directives')

      .directive('likeBtn', likeBtn);

}());
