(function () {
  'use strict';

  var configs = {
    shared: {
      appName: 'WordBin'
    },
    dev: {
      firebase: ''
    },
    prod: {
      firebase: ''
    }
  };

  function config(env) {
    return angular.extend({}, configs.shared, configs[env]);
  }

  config.$inject = ['env'];

  angular.module('wordbin')

    .factory('config', config);

}());
