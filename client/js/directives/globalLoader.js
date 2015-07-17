(function () {
  'use strict';

  function globalLoader() {

    return {
      restrict: 'E',
      templateUrl: 'views/globalLoader.html',
      link: function (scope, element) {
        scope.$on('$stateChangeStart', function () {
          toggleLoader(true);
        });

        scope.$on('$stateChangeSuccess', function () {
          toggleLoader(false);
        });

        toggleLoader(false);

        function toggleLoader(visible) {
          element.toggleClass('hidden', !visible);
        }
      }
    };
  }

  globalLoader.$inject = [];

  angular.module('wordbin.directives')

      .directive('globalLoader', globalLoader);

}());
