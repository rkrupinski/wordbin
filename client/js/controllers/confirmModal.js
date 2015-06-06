(function () {
  'use strict';

  function ConfirmModalCtrl(modalCopy) {
    this.copy = modalCopy;
  }

  ConfirmModalCtrl.$inject = [
    'modalCopy'
  ];

  angular.module('wordbin.controllers')

      .controller('ConfirmModalCtrl', ConfirmModalCtrl);

}());
