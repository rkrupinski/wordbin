'use strict';

module.exports = function (grunt) {

  grunt.config('copy', {
    dist: {
      files: [
        {
          expand: true,
          cwd: '<%= directories.client %>',
          dest: '<%= directories.dist %>/public',
          src: [
            'index.html',
            'favicon.ico',
            'robots.txt',
            'views/**/*.html'
          ]
        },
        {
          // Copy bootstrap-sass font files
          expand: true,
          cwd: '<%= directories.client %>/bower_components/bootstrap-sass/assets',
          dest: '<%= directories.dist %>/public',
          src: [
            'fonts/**/*.{eot,svg,ttf,woff,woff2}'
          ]
        },
        {
          expand: true,
          dest: '<%= directories.dist %>',
          src: [
            'server/**/*'
          ]
        },
        {
          // TODO: Image compression
          expand: true,
          cwd: '<%= directories.client %>',
          dest: '<%= directories.dist %>/public',
          src: [
            'images/**/*.{jpg,png,gif,svg}'
          ]
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
