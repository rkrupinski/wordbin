'use strict';

module.exports = function (grunt) {

  grunt.config('wiredep', {
    all: {
      src: ['<%= directories.client %>/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');

};
