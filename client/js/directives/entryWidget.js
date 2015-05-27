(function () {
  'use strict';

  function EntryWidgetCtrl($modal, auth, entryModal, entry) {
    this._modal = $modal;
    this._entryModal = entryModal;
    this._entry = entry;

    this.disableSubmit = false;
    this.isLoggedIn = auth.isLoggedIn();
  }

  EntryWidgetCtrl.prototype.newEntry = function () {
    var self = this;

    this.disableSubmit = true;

    this._entryModal.prompt()

        .then(function (data) {
          return self._save(data);
        })

        .catch(function (reason) {
          // TODO
          console.log(reason);
        })

        .finally(function () {
          self.disableSubmit = false;
        });
  };

  EntryWidgetCtrl.prototype._save = function (data) {
    return this._entry.create(data);
  };

  EntryWidgetCtrl.$inject = [
    '$modal',
    'auth',
    'entryModal',
    'entry'
  ];

  function entryWidget() {

    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/entryWidget.html',
      controller: EntryWidgetCtrl,
      controllerAs: 'ctrl'
    };
  }

  entryWidget.$inject = [];

  angular.module('wordbin.directives')

      .directive('entryWidget', entryWidget);

}());
