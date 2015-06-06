(function () {
  'use strict';

  function favoritesList($modal) {

    return {

      view: function (entryId) {
        return $modal.open({
          templateUrl: 'views/favoritesModal.html',
          controller: 'FavoritesModalCtrl',
          controllerAs: 'ctrl',
          size: 'sm',
          resolve: {
            entryId: function () {
              return entryId;
            }
          }
        }).result;
      }

    };
  }

  favoritesList.$inject = [
    '$modal'
  ];

  angular.module('wordbin.services')

      .factory('favoritesList', favoritesList);

}());
