(function () {
  'use strict';

  function userRef(usersRef) {

    return function (uid) {
      return usersRef().child(uid);
    };
  }

  userRef.$inject = [
    'usersRef'
  ];

  angular.module('wordbin.services')

      .factory('userRef', userRef);

}());
