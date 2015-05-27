(function () {
  'use strict';

  function entryRef(entriesRef) {

    return function (id) {
      return entriesRef().child(id);
    };
  }

  entryRef.$inject = [
    'entriesRef'
  ];

  angular.module('wordbin.services')

      .factory('entryRef', entryRef);

}());
