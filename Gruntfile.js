'use strict';

module.exports = function(grunt) {

  var directories = {
    client: 'client',
    server: 'server',
    dist: 'dist',
    tmp: '.tmp'
  };

  require('time-grunt')(grunt);

  grunt.initConfig({
    directories: directories
  });

  grunt.loadTasks('grunt');

  grunt.registerTask('wait', function () {
    var done = this.async();
    
    grunt.log.ok('Waiting for server reload...');

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dev') {
      return grunt.task.run([
        'lint',
        'clean:server',
        'env:all',
        'env:dev',
        'concurrent:server',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'wait',
        'open',
        'watch'
      ]);
    }
  });

  grunt.registerTask('test', function () {

  });

  grunt.registerTask('lint', [
    'newer:jshint:client',
    'newer:jshint:server',
    'newer:jscs:client',
    'newer:jscs:server'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('heroku:production', [
    'shell:heroku',
    'default'
  ]);

  grunt.registerTask('default', [
    'lint',
    'test',
    'build'
  ]);

};
