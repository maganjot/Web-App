module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 5001,
          base: {
            path: 'dist',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
    jade: {
      partials: {
          options: {
            client: false
          },
          files: [{
            cwd: "src/app",
            src: "**/*.jade",
            dest: "dist/partials",
            expand: true,
            ext: ".html"
          }]
      },
      main: {
          options: {
            data: {
              debug: false
            }
          },
          files: {
            "dist/index.html": ["src/jade/index.jade"],
            "dist/login.html": ["src/jade/login.jade"],
            "dist/signup.html": ["src/jade/signup.jade"],
            "dist/resetpassword.html": ["src/jade/resetpassword.jade"],
            "dist/login-index.html": ["src/jade/login-index.jade"],
            "dist/privacy.html": ["src/jade/privacy.jade"],
            "dist/account-details.html": ["src/jade/account-details.jade"],
            "dist/wallet.html": ["src/jade/wallet.jade"],
            "dist/request.html": ["src/jade/request.jade"],
            "dist/notifications.html": ["src/jade/notifications.jade"],
            "dist/product-details.html": ["src/jade/product-details.jade"],
            "dist/add-item.html": ["src/jade/add-item.jade"],
            "dist/send-request.html": ["src/jade/send-request.jade"],
          }
      }
    },
    uglify: {
      options:{
        banner : '/*' +
        ' * hangurs.com' +
        ' * Authors: ' +
        ' * Copyright (c) 2016' +
        ' */',
        sourceMap: false,
        mangle: false,
        compress: false
      },
      my_target: {
        files: {
          'dist/js/hangurs.min.js': [
            'src/static/components/angular/angular.js',
            'src/static/components/angular-animate/angular-animate.js',
            'src/static/components/angular-aria/angular-aria.js',
            'src/static/components/angular-messages/angular-messages.js',
            'src/static/svg-assets-cache.js',
            'src/static/components/angular-ui-router/release/angular-ui-router.js',
            'src/static/components/angular-material/angular-material.js',
            'src/static/components/angular-google-chart/ng-google-chart.js',
            'src/static/components/angular-resource/angular-resource.js',
            'src/static/components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
            'src/static/components/angular-busy/angular-busy.js',
            'src/static/components/angular-google-chart/ng-google-chart.js',
            'src/static/components/ng-table/ng-table.min.js',
            'src/static/components/angular-material-expansion-panel/md-expansion-panel.min.js',
            'src/app/app.js',
            'src/app/**/*.js']

        }
      }
    },
    less: {
      production: {
        options: {
          paths: ["css"]

        },
        files: {
          "src/tmp/css/compiled.css": "src/static/less/*.less"
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/hangurs.min.css': [
            'src/css/vendor/*.css',
            'src/static/components/bootstrap/dist/css/bootstrap.min.css',
            'src/css/*.css',
            'src/tmp/css/*.css'
          ]
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/static/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/images/'
        }]
      }
    },
    copy: {
      fonts: {
        cwd: 'src/static/fonts/',
        src: '*',
        dest: 'dist/fonts/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      },
      favicon: {
        cwd: 'src/static/favicon/',
        src: '*',
        dest: 'dist/favicon/',
        expand: true,
        flatten: true,
        filter: 'isFile'
      }
    },
    watch: {
      jade: {
        files: ['src/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/app/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/static/css/**/*.*', 'src/static/less/**/*.*'],
        tasks: ['less', 'cssmin'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['src/static/images/**/*.*'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      },
      copy: {
        files: ['src/static/fonts/**/*.*', 'src/static/favicon/**/*.*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['connect', 'jade', 'uglify', 'less', 'cssmin', 'copy', 'watch']);
  grunt.registerTask('production', ['jade', 'uglify', 'imagemin', 'less', 'cssmin', 'copy' ]);
};