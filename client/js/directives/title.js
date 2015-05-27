(function () {
  'use strict';

  function titleDirective($rootScope, $timeout, $interpolate, config) {
    var titleExpr = $interpolate('{{ title }} - {{ app }}');

    function handleStateChange(e, toState) {
      /*jshint validthis:true*/

      var self = this;

      $timeout(function () {
        var titleText;

        try {

          titleText = titleExpr(angular.extend({}, toState.data.meta, {
            app: config.appName
          }));

        } catch (err) {

          titleText = config.appName;

        }

        self.text(titleText);
      });
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
    '$timeout',
    '$interpolate',
    'config'
  ];

  angular.module('wordbin.directives')

      .directive('title', titleDirective);

}());
