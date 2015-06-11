(function () {
  'use strict';

  function CommentFormCtrl() {

  }

  CommentFormCtrl.$inject = [];

  function commentForm() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/commentForm.html',
      scope: {},
      controller: CommentFormCtrl,
      controllerAs: 'ctrl',
      bindToController: {}
    };
  }

  commentForm.$inject = [];

  angular.module('wordbin.directives')

      .directive('commentForm', commentForm);

}());
