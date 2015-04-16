'use strict';

var path = require('path');
var _ = require('lodash');

var defaults = {

  root: path.normalize(__dirname + '/../../..'),

  port: process.env.port || 9000

};

module.exports = _.merge(defaults,
    require('./' + process.env.NODE_ENV));
