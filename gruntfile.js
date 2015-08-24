/*!
* Panel View for Keep Gruntfile
* http://eichefam.net/projects/keep
* @author Paul Eiche
*/

/**
* Grunt Module
*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: [
        'dist'
      ]
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/jquery/dist',
            src: 'jquery.min.js',
            dest: 'dist/js'
          }
        ]
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img',
            dest: 'dist/img',
            src: '*.png',
            ext: '.png'
          }
        ]
      }
    },
    scsslint: {
      allFiles: ['assets/sass/*.scss'],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'report/scss-lint-report.xml',
        colorizeOutput: true
      },
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          noCache: true,
          sourcemap: 'auto',
          unixNewlines: true
        },
        files: {
          'dist/css/style.css': 'assets/sass/style.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed',
          noCache: true,
          sourcemap: 'none',
          unixNewlines: true
        },
        files: {
          'dist/css/style.css': 'assets/sass/style.scss'
        }
      },
    },
    autoprefixer: {
      dist: {
        files: {
          'dist/css/style.css': 'dist/css/style.css'
        }
      }
    },
    jshint: {
      files: ['GruntFile.js', 'assets/js/*.js'],
      options: {
        'globals': {
          jQuery: true,
          alert: true
        }
      }
    },
    uglify: {
      dev: {
        options: {
          mangle: false,
          beautify: true
        },
        files: [{
          expand: true,
          cwd: 'assets/js',
          dest: 'dist/js',
          src: '*.js',
          ext: '.js'
        }]
      },
      prod: {
        options: {
          compress: {
            pure_funcs: [
              'console.log',
              'alert'
            ]
          }
        },
        files: [{
          expand: true,
          cwd: 'assets/js',
          dest: 'dist/js',
          src: '*.js',
          ext: '.js'
        }]
      }
    },
    watch: {
      css: {
        files: 'assets/sass/*.scss',
        tasks: ['scsslint', 'sass:dev', 'autoprefixer']
      },
      javascript: {
        files: 'assets/js/*.js',
        tasks: ['jshint', 'uglify:dev']
      }
    },
    compress: {
      main: {
        options: {
          mode: 'zip',
          archive: function() {
            return 'releases/keep.zip';
          }
        },
        files: [
          {
            expand: true,
            src: [
              '**',
              '!.*',
              '!*.md',
              '!bower.json',
              '!gruntfile.js',
              '!package.json',
              '!bower_components/**',
              '!assets/**',
              '!node_modules/**',
              '!releases/**',
              '!report/**'
            ]
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-scss-lint');

  grunt.registerTask('validate', ['scsslint', 'jshint']);

  grunt.registerTask('dev', ['clean', 'copy', 'imagemin', 'sass:dev', 'autoprefixer', 'uglify:dev']);
  grunt.registerTask('prod', ['clean', 'copy', 'imagemin', 'sass:prod', 'autoprefixer', 'uglify:prod']);

  grunt.registerTask('default', ['scsslint', 'jshint',  'watch']);

  grunt.registerTask('zip', 'Make a zip file for installation.', function() {
    grunt.log.writeln('Zipping up the project.');
    grunt.task.run('compress');
  });
};
