'use strict';

module.exports = function (grunt) {

  grunt.config('useminPrepare', {
    options: {
      dest: '<%= directories.dist %>/public'
    },
    html: ['<%= directories.client %>/**/*.html']
  });

  grunt.config('usemin', {
    options: {
      assetsDirs: [
        '<%= directories.dist %>/public',
        '<%= directories.dist %>/public/images'
      ],
      patterns: {
        js: [
          [/(images\/.*?\.(?:png|jpg|svg|gif))/gm,
              'Updating image urls in scripts']
        ]
      }
    },
    html: ['<%= directories.dist %>/public/**/*.html'],
    css: ['<%= directories.dist %>/public/**/*.css'],
    js: ['<%= directories.dist %>/public/**/*.js']
  });

  grunt.loadNpmTasks('grunt-usemin');

};
