'use strict';

module.exports = function (grunt) {

  grunt.config('concurrent', {
    dist: [
      'sass'
    ],
    server: [
      'sass'
    ]
  });

  grunt.loadNpmTasks('grunt-concurrent');

};
