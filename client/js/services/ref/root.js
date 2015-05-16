(function () {
  'use strict';

  function rootRef(firebaseRef) {

    return function () {
      return firebaseRef();
    };
  }

  rootRef.$inject = [
    'firebaseRef'
  ];

  angular.module('wordbin')

    .factory('rootRef', rootRef);

}());
