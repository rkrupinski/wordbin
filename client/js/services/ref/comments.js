(function () {
  'use strict';

  function commentsRef(rootRef) {

    return function () {
      return rootRef().child('comments');
    };
  }

  commentsRef.$inject = [
    'rootRef'
  ];

  angular.module('wordbin.services')

      .factory('commentsRef', commentsRef);

}());
