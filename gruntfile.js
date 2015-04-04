// Ayasdi Inc. Copyright 2014 - all rights reserved.

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      js: {command: 'duo app/build/build.js > dist/build.js --no-cache'}
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['app/build/build.scss'],
          dest: './dist/',
          ext: '.css'
        }]
      }
    },
    watch: {
      js: {
        files: ['app/modules/**/*.js', 'app/build/build.js', 'app/modules/**/*.html'],
        tasks: ['shell:js'],
      },
      css: {
        files: ['app/modules/**/*.scss'],
        tasks: ['sass']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ignore: ['/**', 'app/modules/**', 'node_modules/**'],
          watch: ['server.js', 'gruntfile.js'],
          env: {PORT: '4000'}
        }
      },
    },
    concurrent: {
      app: {
        tasks: ['nodemon:dev', 'watch'],
        options: {logConcurrentOutput: true}
      }
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('app', ['shell', 'sass', 'concurrent:app']);
};
