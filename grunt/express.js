'use strict';

module.exports = function (grunt) {

  grunt.config('express', {
    options: {
      port: process.env.PORT || 9000
    },
    dev: {
      options: {
        script: '<%= directories.server %>/app.js',
        debug: true
      }
    },
    prod: {
      
    }
  });

  grunt.loadNpmTasks('grunt-express-server');

};
