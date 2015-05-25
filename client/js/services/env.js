(function () {
  'use strict';

  var hosts = [
    'wordb.in',
    'wordbin.herokuapp.com'
  ];

  angular.module('wordbin.services')

      .constant('env', hosts.indexOf(location.host) !== -1 ?
          'prod' : 'dev');

}());
