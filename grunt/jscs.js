'use strict';

module.exports = function (grunt) {

  grunt.config('jscs', {
    client: {
      options: {
        config: '<%= directories.client %>/.jscsrc'
      },
      files: {
        src: [
          '<%= directories.client %>/js/**/*.js'
        ]
      }
    },
    server: {
      options: {
        config: '<%= directories.server %>/.jscsrc'
      },
      files: {
        src: [
          '<%= directories.server %>/**/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');

};
