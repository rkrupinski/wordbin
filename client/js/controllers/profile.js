(function () {
  'use strict';

  function ProfileCtrl(userData) {
    console.log('Profile:', userData);
  }

  ProfileCtrl.$inject = [
    'userData'
  ];

  angular.module('wordbin.controllers')

      .controller('ProfileCtrl', ProfileCtrl);

}());
