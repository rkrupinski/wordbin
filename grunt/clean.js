'use strict';

module.exports = function (grunt) {

  grunt.config('clean', {
    dist: [
      '<%= directories.dist %>'
    ],
    server: [
      '<%= directories.tmp %>'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

};
