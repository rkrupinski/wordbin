'use strict';

module.exports = function (grunt) {

  grunt.config('shell', {
    heroku: {
      command: './node_modules/bower/bin/bower/install'
    }
  });

  grunt.loadNpmTasks('grunt-shell');

};
