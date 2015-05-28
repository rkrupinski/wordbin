(function () {
  'use strict';

  function firebase() {
    return Firebase;
  }

  firebase.$inject = [];

  angular.module('wordbin.services')

      .factory('Firebase', firebase);

}());
