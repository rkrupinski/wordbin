(function () {
  'use strict';

  function EntryPageCtrl($stateParams, $firebaseObject, entryRef) {
    var entry = entryRef($stateParams.entryId),
        self = this;

    $firebaseObject(entry).$loaded().then(function (data) {
      self.entry = data;
    });
  }

  EntryPageCtrl.$inject = [
    '$stateParams',
    '$firebaseObject',
    'entryRef'
  ];

  angular.module('wordbin.controllers')

      .controller('EntryPageCtrl', EntryPageCtrl);

}());
