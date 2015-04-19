// Ayasdi Inc. Copyright 2014 - all rights reserved.

var vendorJs = ['components/js/react-with-addons.js',
                'components/js/jquery-2.1.1.min.js'];

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    react: {
      files: {
        expand: true,
        cwd: 'app/modules',
        src: ['**/*.jsx'],
        dest: 'app/build/react/',
        ext: '.js'
      }
    },
    copy: {
      asstes: {
        expand: true,
        cwd: 'components/fonts/font-awesome-4.3.0/fonts',
        src: '**',
        dest: 'dist/assets/fonts'
      }
    },
    concat: {
      js:{
        src: [vendorJs, 'app/build/react/global/*.js', 'app/build/react/**!(global)/*.js'],
        dest: 'dist/build.js'
      }
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
      react: {
        files: ['app/modules/**/*.jsx'],
        tasks: ['react'],
      },
      js: {
        files: ['app/build/react/**/*.js'],
        tasks: ['concat'],
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('app', ['react', 'concat', 'sass', 'concurrent:app']);
  grunt.registerTask('build', ['copy', 'react', 'concat', 'sass', 'concurrent:app']);

};
