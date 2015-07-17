(function () {
  'use strict';

  function entriesRef(rootRef) {

    return function () {
      return rootRef().child('entries');
    };
  }

  entriesRef.$inject = [
    'rootRef'
  ];

  angular.module('wordbin.services')

      .factory('entriesRef', entriesRef);

}());
