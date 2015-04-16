'use strict';

module.exports = function (grunt) {

  grunt.config('open', {
    server: {
      url: 'http://localhost:<%= express.options.port %>'
    }
  });

  grunt.loadNpmTasks('grunt-open');

};
