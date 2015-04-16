'use strict';

module.exports = function (grunt) {

  grunt.config('htmlmin', {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      },
      files: [
        {
          expand: true,
          cwd: '<%= directories.dist %>/public',
          src: [
            '**/*.html'
          ],
          dest: '<%= directories.dist %>/public'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

};
