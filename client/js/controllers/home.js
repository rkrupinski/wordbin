(function () {
  'use strict';

  function HomeCtrl(recentEntries) {
    this.entries = recentEntries;
  }

  HomeCtrl.$inject = [
    'recentEntries'
  ];

  angular.module('wordbin.controllers')

      .controller('HomeCtrl', HomeCtrl);

}());
