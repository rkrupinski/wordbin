(function () {
  'use strict';

  function ProfileCtrl(userData) {
    this.profile = userData;
  }

  ProfileCtrl.$inject = [
    'userData'
  ];

  angular.module('wordbin.controllers')

      .controller('ProfileCtrl', ProfileCtrl);

}());
