(function () {
  'use strict';

  function CommentsCtrl($firebaseArray, commentsRef) {
    var self = this,
        ref;

    this.loading = true;

    ref = commentsRef()

        .orderByChild('target')
        .startAt(this.entryId)
        .endAt(this.entryId);

    this.comments = $firebaseArray(ref);

    this.comments.$loaded(function () {
      self.loading = false;
    });
  }

  CommentsCtrl.$inject = [
    '$firebaseArray',
    'commentsRef'
  ];

  function comments() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/comments.html',
      scope: {},
      controller: CommentsCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        entryId: '='
      }
    };
  }

  comments.$inject = [];

  angular.module('wordbin.directives')

      .directive('comments', comments);

}());
