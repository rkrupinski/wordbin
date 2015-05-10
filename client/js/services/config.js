(function () {
  'use strict';

  var configs = {

    shared: {
      appName: 'WordBin',
      authProvider: 'twitter'
    },

    dev: {
      firebaseUrl: 'https://wordbin-dev.firebaseio.com/'
    },

    prod: {
      firebaseUrl: ''
    }

  };

  function config(env) {
    return angular.extend({}, configs.shared, configs[env]);
  }

  config.$inject = ['env'];

  angular.module('wordbin')

    .factory('config', config);

}());
