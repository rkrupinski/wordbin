(function () {
  'use strict';

  function authObj($firebaseAuth, firebaseRef) {
    var ref = firebaseRef();

    return $firebaseAuth(ref);
  }

  authObj.$inject = [
    '$firebaseAuth',
    'config'
  ];

  angular.module('wordbin')

    .factory('authObj', authObj);

}());
