'use strict';

module.exports = function (grunt) {

  grunt.config('sass', {
    all: {
      files: {
        '<%= directories.tmp %>/css/app.css':
            '<%= directories.client %>/sass/app.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');

};
