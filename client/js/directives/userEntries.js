(function () {
  'use strict';

  function UserEntriesCtrl($firebaseArray, entriesRef) {
    var self = this,
        ref;

    this.loading = true;

    ref = entriesRef()

        .orderByChild('author')
        .equalTo(this.userId);

    $firebaseArray(ref).$loaded()

        .then(function (data) {
          self.entries = data;

          self.loading = false;
        });
  }

  UserEntriesCtrl.$inject = [
    '$firebaseArray',
    'entriesRef'
  ];

  function userEntries() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/userEntries.html',
      scope: {},
      controller: UserEntriesCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        userId: '='
      }
    };
  }

  userEntries.$inject = [];

  angular.module('wordbin.directives')

      .directive('userEntries', userEntries);

}());
