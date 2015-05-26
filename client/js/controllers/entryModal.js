(function () {
  'use strict';

  function EntryModalCtrl($modalInstance, user) {
    this._modalInstance = $modalInstance;
    this._user = user;

    this._loadUserData();
  }

  EntryModalCtrl.prototype.cancel = function () {
    this._modalInstance.dismiss();
  };

  EntryModalCtrl.prototype._loadUserData = function () {
    var self = this;

    this._user.get().then(function (data) {
      self.userData = data;
    });
  };

  EntryModalCtrl.prototype.postEntry = function (e) {
    e.preventDefault();

    this._modalInstance.close(this.entry);
  };

  EntryModalCtrl.$inject = [
    '$modalInstance',
    'user'
  ];

  angular.module('wordbin.controllers')

      .controller('EntryModalCtrl', EntryModalCtrl);

}());
