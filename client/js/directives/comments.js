(function () {
  'use strict';

  function CommentsCtrl() {

  }

  CommentsCtrl.$inject = [];

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
