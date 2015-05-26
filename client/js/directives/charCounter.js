(function () {
  'use strict';

  function CharCounterCtrl($scope) {
    var self = this;

    $scope.$watch(function () {
      return self._getCharsLeft();
    }, function (val) {
      self.charsLeft = val;
    });
  }

  CharCounterCtrl.prototype._getCharsLeft = function () {
    var value = this.field.$viewValue || '';

    return +this.limit - value.length;
  };

  CharCounterCtrl.$inject = [
    '$scope'
  ];

  function charCounter() {

    return {
      restrict: 'E',
      replace: true,
      template: [
        '<div class="char-counter">',
          'Characters remaining: ',
          '<span class="char-counter__left" ng-class="',
              '{ \'char-counter__left--alert\': ctrl.charsLeft < 10 }">',
            '{{ ctrl.charsLeft }}',
          '</span>',
        '</div>'
      ].join(''),
      scope: {
        field: '=',
        limit: '@'
      },
      controller: CharCounterCtrl,
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  charCounter.$inject = [];

  angular.module('wordbin.directives')

      .directive('charCounter', charCounter);

}());
