(function () {
  'use strict';

  function titleDirective($rootScope, $state, $interpolate, config) {
    var expr = $interpolate('{{ title }} - {{ app }}');

    function handleStateChange(e, toState) {
      /*jshint validthis:true*/

      var titleText;

      if (toState.data && toState.data.meta) {
        titleText = expr(angular.extend({}, toState.data.meta, {
          app: config.appName
        }));
      }

      this.text(titleText || config.appName);
    }

    return {
      restrict: 'E',
      link: function (scope, element) {
        $rootScope.$on('$stateChangeSuccess',
            handleStateChange.bind(element));
      }
    };
  }

  titleDirective.$inject = [
    '$rootScope',
    '$state',
    '$interpolate',
    'config'
  ];

  angular.module('wordbin.directives')

      .directive('title', titleDirective);

}());
