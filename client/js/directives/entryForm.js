(function () {
  'use strict';

  function EntryFormCtrl($modal, auth, entryModal) {
    this._modal = $modal;
    this._entryModal = entryModal;

    this.disableSubmit = false;
    this.isLoggedIn = auth.isLoggedIn();
  }

  EntryFormCtrl.prototype.newEntry = function () {
    var self = this;

    this.disableSubmit = true;

    this._entryModal.prompt()

        .then(function (data) {
          console.log('Entry:', data);
        })

        .finally(function () {
          self.disableSubmit = false;
        });
  };

  EntryFormCtrl.$inject = [
    '$modal',
    'auth',
    'entryModal'
  ];

  function entryForm() {

    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/entryForm.html',
      controller: EntryFormCtrl,
      controllerAs: 'ctrl'
    };
  }

  entryForm.$inject = [];

  angular.module('wordbin.directives')

      .directive('entryForm', entryForm);

}());
