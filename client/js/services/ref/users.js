(function () {
  'use strict';

  function usersRef(rootRef) {

    return function () {
      return rootRef().child('users');
    };
  }

  usersRef.$inject = [
    'rootRef'
  ];

  angular.module('wordbin.services')

      .factory('usersRef', usersRef);

}());
