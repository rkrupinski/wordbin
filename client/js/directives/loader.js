(function () {
  'use strict';

  function loader() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/loader.html'
    };
  }

  loader.$inject = [];

  angular.module('wordbin.directives')

      .directive('loader', loader);

}());
