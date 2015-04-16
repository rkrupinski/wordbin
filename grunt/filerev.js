'use strict';

module.exports = function (grunt) {

  grunt.config('filerev', {
    options: {
      algorithm: 'md5',
      length: 8
    },
    dist: {
      src: [
        '<%= directories.dist %>/public/css/{,*/}*.css',
        '<%= directories.dist %>/public/js/{,*/}*.js',
        '<%= directories.dist %>/public/images/**/*.{jpg,png,gif,svg}'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-filerev');

};
