'use strict';

module.exports = function (req, res) {
  res.status(200).end('/* Dummy templates */ \n\n' +
      'angular.module(\'wordbin.templates\', []);');
};
