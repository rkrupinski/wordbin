(function () {
  'use strict';

  function authObj($firebaseAuth, firebaseRef) {
    var ref = firebaseRef();

    return $firebaseAuth(ref);
  }

  authObj.$inject = [
    '$firebaseAuth',
    'firebaseRef'
  ];

  angular.module('wordbin.services')

      .factory('authObj', authObj);

}());
