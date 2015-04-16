'use strict';

module.exports = function (grunt) {

  grunt.config('concurrent', {
    dist: [
      'sass',
      'imagemin'
    ],
    server: [
      'sass'
    ]
  });

  grunt.loadNpmTasks('grunt-concurrent');

};
