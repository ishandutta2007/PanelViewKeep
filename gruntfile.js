/*!
* Panel View for Keep Gruntfile
* http://eichefam.net/projects/keep
* @author Paul Eiche
*/

/**
* Grunt Module
*/
module.exports = function(grunt) {

  var target = grunt.option('target') || 'prod';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {
            cwd: 'bower_components/jquery/dist',
            src: 'jquery.min.js',
            dest: 'dist/js',
            expand: true
          },
          {
            cwd: 'assets/img',
            src: '*',
            dest: 'dist/img',
            expand: true
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
      build: {
        files: [{
          expand: true,
          cwd: 'assets/js',
          dest: 'dist/js',
          src: '**/*.js'
        }]
      }
    },
    watch: {
      css: {
        files: 'assets/sass/*.scss',
        tasks: ['scsslint', 'sass:' + target, 'autoprefixer']
      },
      javascript: {
        files: 'assets/js/*.js',
        tasks: ['jshint', 'uglify']
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
              '!dist/**',
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-scss-lint');

  grunt.registerTask('build', ['copy', 'sass:' + target, 'autoprefixer', 'uglify']);
  grunt.registerTask('validate', ['scsslint', 'jshint']);
  grunt.registerTask('default', ['scsslint', 'watch']);

  grunt.registerTask('zip', 'Make a zip file for installation.', function() {
    grunt.log.writeln('Zipping up the project.');
    grunt.task.run('compress');
  });
};
