(function () {
  'use strict';

  function commentRef(commentsRef) {

    return function (id) {
      return commentsRef().child(id);
    };
  }

  commentRef.$inject = [
    'commentsRef'
  ];

  angular.module('wordbin.services')

      .factory('commentRef', commentRef);

}());
