(function () {
  'use strict';

  function EntryModalCtrl($modalInstance) {
    this._modalInstance = $modalInstance;
  }

  EntryModalCtrl.prototype.cancel = function () {
    this._modalInstance.dismiss();
  };

  EntryModalCtrl.$inject = [
    '$modalInstance'
  ];

  angular.module('wordbin.controllers')

      .controller('EntryModalCtrl', EntryModalCtrl);

}());
