(function () {
  'use strict';

  function FavoritesModalCtrl(entryId) {
    console.log(entryId);
  }

  FavoritesModalCtrl.$inject = [
    'entryId'
  ];

  angular.module('wordbin.controllers')

      .controller('FavoritesModalCtrl', FavoritesModalCtrl);

}());
