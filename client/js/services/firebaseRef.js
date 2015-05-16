(function () {
  'use strict';

  function firebaseRef(Firebase, config) {
    return function (path) {
      return new Firebase(config.firebaseUrl + (path || ''));
    };
  }

  firebaseRef.$inject = [
    'Firebase',
    'config'
  ];

  angular.module('wordbin')

    .factory('firebaseRef', firebaseRef);

}());
