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
          expand: true,
          dest: '<%= directories.dist %>',
          src: [
            'server/**/*'
          ]
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
