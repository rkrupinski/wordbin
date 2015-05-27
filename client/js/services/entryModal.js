(function () {
  'use strict';

  function entryModal($modal) {

    return {

      prompt: function () {
        return $modal.open({
          templateUrl: 'views/entryModal.html',
          controller: 'EntryModalCtrl',
          controllerAs: 'ctrl'
        }).result;
      }

    };
  }

  entryModal.$inject = [
    '$modal'
  ];

  angular.module('wordbin.services')

      .factory('entryModal', entryModal);

}());
