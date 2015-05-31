module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'dist/build.js': 'app/components/**/*.react.js'
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'dist/build.js': 'app/components/**/*.react.js'
        }
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['app/components/app/app.scss'],
          dest: './dist/',
          ext: '.css',
          rename: function(dest, src) { return 'dist/build.css'; }
        }]
      }
    },

    watch: {
      browserify: {
        files: ['app/**/*.js'],
        tasks: ['browserify:dev']
      },
      css: {
        files: ['app/components/**/*.scss'],
        tasks: ['sass', 'replace']
      },
      options: {
        nospawn: true
      }
    },

    cssmin: {
      combine: {
        files: {'dist/build.css': ['dist/build.css']}
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        files: {'dist/build.js': ['dist/build.js']}
      }
    },

    copy: {
      asstes: {
        expand: true,
        cwd: './node_modules/font-awesome/fonts/',
        src: '**',
        dest: 'dist/fonts/'
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /...fonts/g,
              replacement: 'fonts'
            }
          ]
        },
        files: {'dist/build.css': ['dist/build.css']}
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
 
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['browserify:dev', 'sass', 'replace', 'copy']);
  grunt.registerTask('build', ['browserify:build', 'sass', 'replace', 'copy', 'cssmin', 'uglify']);

};