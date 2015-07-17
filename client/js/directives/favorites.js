(function () {
  'use strict';

  function favorites(favoritesList) {

    return {
      restrict: 'A',
      scope: {
        entryId: '@favorites'
      },
      link: function (scope, element) {
        var ns = '.favorites',
            active = false;

        element.on('click' + ns, function handleClick(e) {
          e.preventDefault();

          if (active) {
            return;
          }

          active = true;

          favoritesList.view(scope.entryId)

              .finally(function () {
                active = false;
              });
        });

        scope.$on('$destroy', function () {
          element.off(ns);
        });
      }
    };
  }

  favorites.$inject = [
    'favoritesList'
  ];

  angular.module('wordbin.directives')

      .directive('favorites', favorites);

}());
