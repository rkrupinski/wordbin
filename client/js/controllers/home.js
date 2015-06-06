(function () {
  'use strict';

  function HomeCtrl($firebaseArray, entriesRef) {
    var entries = entriesRef().orderByChild('timestamp').limitToLast(5);

    this.entries = $firebaseArray(entries);
  }

  HomeCtrl.$inject = [
    '$firebaseArray',
    'entriesRef'
  ];

  angular.module('wordbin.controllers')

      .controller('HomeCtrl', HomeCtrl);

}());
