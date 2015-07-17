(function () {
  'use strict';

  var configs = {

    shared: {
      appName: 'WordBin'
    },

    dev: {
      firebaseUrl: 'https://wordbin-dev.firebaseio.com/'
    },

    prod: {
      // TODO
      firebaseUrl: 'https://wordbin-dev.firebaseio.com/'
    }

  };

  function config(env) {
    return angular.extend({}, configs.shared, configs[env]);
  }

  config.$inject = ['env'];

  angular.module('wordbin.services')

      .factory('config', config);

}());
