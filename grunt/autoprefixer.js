'use strict';

module.exports = function (grunt) {

  grunt.config('autoprefixer', {
    options: {
      browsers: ['last 2 versions', 'ie 9']
    },
    all: {
      files: [{
        expand: true,
        cwd: '<%= directories.tmp %>/',
        src: '{,*/}*.css',
        dest: '<%= directories.tmp %>/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');

};
