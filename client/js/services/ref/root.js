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

  angular.module('wordbin.services')

      .factory('rootRef', rootRef);

}());
