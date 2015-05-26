(function () {
  'use strict';

  function avatar($parse) {
    var AVATAR_DUMMY_PATH = 'images/avatar.png';

    return {
      restrict: 'E',
      replace: true,
      template: '<img src="{{ src }}" alt="{{ alt }}">',
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.data),
            unwatch;

        scope.src = AVATAR_DUMMY_PATH;

        unwatch = scope.$watch(function () {
          return fn(scope);
        }, function (data) {
          if (!data) {
            return;
          }

          angular.extend(scope, {
            src: data.image,
            alt: data.name
          });

          unwatch();
        });
      }
    };
  }

  avatar.$inject = [
    '$parse'
  ];

  angular.module('wordbin.directives')

      .directive('avatar', avatar);

}());
