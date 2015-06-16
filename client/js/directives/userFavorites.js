(function () {
  'use strict';

  function UserFavoritesCtrl() {

  }

  UserFavoritesCtrl.$inject = [];

  function userFavorites() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/userFavorites.html',
      scope: {},
      controller: UserFavoritesCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        userId: '='
      }
    };
  }

  userFavorites.$inject = [];

  angular.module('wordbin.directives')

      .directive('userFavorites', userFavorites);

}());
