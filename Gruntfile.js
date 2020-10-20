module.exports = function (grunt) {
  var timer = require("grunt-timer");
  timer.init(grunt);

  grunt.initConfig({
    
    sass: {
      compile: {
        options: {
          style: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/css',
            src: ['./**/*.scss'],
            dest: 'ci-frontend/dist/css',
            ext: '.css'
          }
        ]
      }
    },


    copy: {
      css: {
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/css',
            src: ['./**/*.css', './**/*.css.map', './**/*.scss'],
            dest: 'ci-frontend/dist/css'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src',
            src: ['./**/*.html', './**/*.shtml'],
            dest: 'ci-frontend/dist'
          }
        ]
      },     
      images: {
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/images',
            src: ['./**/*'],
            dest: 'ci-frontend/dist/images'
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/css',
            src: ['./fonts/*'],
            dest: 'ci-frontend/dist/css'
          }
        ]
      }
    },

    mince: {
      compile: {
        expand: true,
        cwd: 'ci-frontend/src/js',
        src: ['./**/*.js', '!./**/_*.js'],
        dest: 'ci-frontend/dist/js',
        ext: '.js',
        manifestPath: "ci-frontend/dist/js/manifest.json",
        manifestOptions: {
          compress: false,
          sourceMaps: true,
          sourceMap: true,
          embedMappingComments: true
        },
        options: {
          bare: true,
          preserve_dirs: true,
          sourceMaps: true
        },
        files: []
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/images',
            src: ['./**/*.{png,jpg,gif}'],
            dest: 'ci-frontend/dist/images'
          }
        ]
      }
    },

    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/css',
            src: ['./**/*.css'],
            dest: 'ci-frontend/dist/css'
          }
        ]
      }
    },

    uglify: {
      dist: {
        options: {
          report: 'min',
          compress: {
            drop_console: true
          }
        },
        files: [
          {
            expand: true,
            cwd: 'ci-frontend/src/js',
            src: ['./**/*.js'],
            dest: 'ci-frontend/dist/js'
          }
        ]
      }
    },
	
	autoprefixer: {
		options: {
            browsers: [
                'last 2 versions',
                'iOS >= 8',
                'Safari >= 8',
            ]
		},
		your_target: {
		  src : [
                'ci-frontend/dist/css/*.css',
            ]		
		},
	},
    watch: {
      html: {
        files: ['ci-frontend/src/**/*.html', 'ci-frontend/src/**/*.shtml'],
        tasks: ['copy']
      },
      sass: {
        files: ['ci-frontend/src/css/**/*.css', 'ci-frontend/src/css/**/*.scss'],
        tasks: ['sass', 'copy']
      },
      mince: {
        files: ['ci-frontend/src/js/**/*.js', 'ci-frontend/src/js/**/*.coffee'],
        tasks: ['mince:compile', 'copy']
      },
      images: {
        files: ['ci-frontend/src/images/**/*'],
        tasks: ['copy']
      },
      options: {
        livereload: true
      }
    }

  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mincer');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('run', ['sass', 'mince', 'copy', 'autoprefixer']);
  return grunt.registerTask('default', ['run']);
};