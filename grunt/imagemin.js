'use strict';

module.exports = function (grunt) {

  grunt.config('imagemin', {
    dist: {
      files: [
        {
          expand: true,
          cwd: '<%= directories.client %>/images',
          src: [
            '**/*.{png,jpg,gif}'
          ],
          dest: '<%= directories.dist %>/public/images'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');

};
