(function () {
  'use strict';

  function through($modal) {

    return {

      confirm: function (copy) {
        return $modal.open({
          templateUrl: 'views/confirmModal.html',
          controller: 'ConfirmModalCtrl',
          controllerAs: 'ctrl',
          size: 'sm',
          resolve: {
            modalCopy: function () {
              return copy;
            }
          }
        }).result;
      }

    };
  }

  through.$inject = [
    '$modal'
  ];

  angular.module('wordbin.services')

      .factory('through', through);

}());
