(function () {
  'use strict';

  function ProfileWidgetCtrl() {

  }

  ProfileWidgetCtrl.$inject = [];

  function profileWidget() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/profileWidget.html',
      scope: {},
      controller: ProfileWidgetCtrl,
      controllerAs: 'ctrl',
      bindToController: {
        profile: '=data'
      }
    };
  }

  profileWidget.$inject = [];

  angular.module('wordbin.directives')

      .directive('profileWidget', profileWidget);

}());
