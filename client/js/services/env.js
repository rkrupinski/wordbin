(function () {
  'use strict';

  var hosts = [
    'wordb.in',
    'wordbin.herokuapp.com'
  ];

  angular.module('wordbin')

    .constant('env', hosts.indexOf(location.host) !== -1 ?
        'prod' : 'dev');

}());
