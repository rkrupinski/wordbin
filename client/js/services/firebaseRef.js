(function () {
  'use strict';

  function firebaseRef(config) {
    function factory(path) {
      return new Firebase(config.firebaseUrl + (path || ''));
    }

    return factory;
  }

  firebaseRef.$inject = [
    'config'
  ];

  angular.module('wordbin')

    .factory('firebaseRef', firebaseRef);

}());
