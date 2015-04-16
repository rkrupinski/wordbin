'use strict';

module.exports = function (grunt) {

  grunt.config('watch', {
    sass: {
      files: [
        '<%= directories.client %>/sass/**/*.scss'
      ],
      tasks: [
        'sass',
        'autoprefixer'
      ]
    },
    js: {
      files: [
        '<%= directories.client %>/js/**/*.js'
      ],
      tasks: [
        'newer:jshint:client',
        'newer:jscs:client'
      ]
    },
    livereload: {
      options: {
        livereload: true
      },
      files: [
        '<%= directories.tmp %>/css/{,*/}*.css',
        '<%= directories.client %>/**/*.html',
        '<%= directories.client %>/js/**/*.js',
        '<%= directories.client %>/images/**/*.{jpg,png,gif,svg}'
      ]
    },
    express: {
      options: {
        livereload: true,
        nospawn: true
      },
      files: [
        '<%= directories.server %>/**/*.{js,json}'
      ],
      tasks: [
        'newer:jshint:server',
        'newer:jscs:server',
        'express:dev',
        'wait'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
