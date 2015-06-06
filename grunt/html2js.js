'use strict';

module.exports = function (grunt) {

  grunt.config('html2js', {
    options: {
      base: '<%= directories.client %>',
      module: 'wordbin.templates',
      singleModule: true,
      quoteChar: '\'',
      htmlmin: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    },
    dist: {
      src: grunt.config.get('precompiled'),
      dest: '<%= directories.tmp %>/templates/templates.js'
    }
  });

  grunt.loadNpmTasks('grunt-html2js');

};
