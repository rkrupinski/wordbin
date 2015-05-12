'use strict';

module.exports = function (grunt) {

  grunt.config('sass', {
    all: {
      options: {
        includePaths: [
          '<%= directories.client %>/bower_components/bootstrap-sass/assets/stylesheets'
        ]
      },
      files: {
        '<%= directories.tmp %>/css/app.css':
            '<%= directories.client %>/sass/app.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');

};
