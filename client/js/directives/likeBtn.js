(function () {
  'use strict';

  function LikeBtnCtrl($q, like, entry, auth) {
    this._q = $q;
    this._like = like;
    this._entry = entry;

    this.isLoggedIn = auth.isLoggedIn();

    this._fetchData();
  }

  LikeBtnCtrl.prototype._fetchData = function () {
    var self = this;

    this._q.all([
      this._like.count(this.entryId),
      this._like.likes(this.entryId),
      this._entry.isAuthor(this.entryId)
    ])

        .then(function (data) {
          self.likeCount = data[0] || 0;
          self.likes = data[1];
          self.isAuthor = data[2];
        });
  };

  LikeBtnCtrl.prototype.like = function () {
    var self = this;

    this._like.like(this.entryId)

        .then(function () {
          self.likes = true;
          self.likeCount++;
        });
  };

  LikeBtnCtrl.prototype.isActive = function () {
    return this.isLoggedIn && !this.isAuthor && !this.likes;
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
