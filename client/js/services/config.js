(function () {
  'use strict';

  var configs = {
    dev: {
      firebase: ''
    },
    prod: {
      firebase: ''
    }
  };

  function config(env) {

    return angular.extend({
      appName: 'WordBin'
    }, configs[env]);
  }

  config.$inject = ['env'];

  angular.module('wordbin')

    .factory('config', config);

}());
