(function () {
  'use strict';

  function HomeCtrl($firebaseArray, entriesRef) {
    var entries = entriesRef().orderByChild('timestamp');

    this.entries = $firebaseArray(entries);
  }

  HomeCtrl.$inject = [
    '$firebaseArray',
    'entriesRef'
  ];

  angular.module('wordbin.controllers')

      .controller('HomeCtrl', HomeCtrl);

}());
