'use strict';

module.exports = function (grunt) {

  grunt.config('jshint', {
    options: {
      reporter: require('jshint-stylish')
    },
    client: {
      options: {
        jshintrc: '<%= directories.client %>/.jshintrc'
      },
      src: [
        '<%= directories.client %>/js/**/*.js'
      ]
    },
    server: {
      options: {
        jshintrc: '<%= directories.server %>/.jshintrc'
      },
      src: [
        '<%= directories.server %>/**/*.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
