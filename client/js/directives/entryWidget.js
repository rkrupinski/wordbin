(function () {
  'use strict';

  function EntryWidgetCtrl($q, $modal, auth, entryModal) {
    this._q = $q;
    this._modal = $modal;
    this._entryModal = entryModal;

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

        .catch(function (err) {
          // TODO
          console.log(err.message);
        })

        .finally(function () {
          self.disableSubmit = false;
        });
  };

  EntryWidgetCtrl.prototype._save = function (data) {
    console.log(data);

    // TODO
    return this._q.when();
  };

  EntryWidgetCtrl.$inject = [
    '$q',
    '$modal',
    'auth',
    'entryModal'
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
