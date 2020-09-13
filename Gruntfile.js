module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    concurrent: {
      targetWatch: ['watch:styleWatch', 'watch:jsWatch'],
      targetWatchDev: ['watch:HtmlWatchDev', 'watch:styleWatchDev', 'watch:jsWatchDev'],
      options: {
        logConcurrentOutput: true,
      },
    },

    watch: {
      styleWatch: {
        files: ['source/less/**/*.less'],
        tasks: ['less'],
      },
      jsWatch: {
        files: ['source/js/*/*.js'],
        tasks: ['concat'],
      },
      HtmlWatchDev: {
        files: ['source/*.html'],
        tasks: ['clean:buildCleanHtmlDev', 'copy:buildHtmlCopy', 'htmlmin'],
      },
      styleWatchDev: {
        files: ['source/less/**/*.less'],
        tasks: ['less', 'clean:buildCleanStyleDev', 'copy:buildStyleCopy', 'postcss', 'csso'],
      },
      jsWatchDev: {
        files: ['source/js/*/*.js'],
        tasks: ['concat', 'clean:buildCleanJsDev', 'copy:buildJsCopy', 'uglify'],
      },
    },

    browserSync: {
      serverSync: {
        bsFiles: {
          src: ['source/*.html', 'source/css/*.css', 'source/js/*.js'],
        },
        options: {
          server: 'source/',
          watchTask: true,
        },
      },
      serverSyncDev: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css', 'build/js/*.js'],
        },
        options: {
          server: 'build/',
          watchTask: true,
        },
      },
    },

    less: {
      lessCompil: {
        options: {
          relativeUrls: true,
        },
        files: {
          'source/css/style.css': 'source/less/style.less',
        },
      },
    },

    postcss: {
      stylePrefix: {
        options: {
          processors: [
            require('autoprefixer')(),
          ],
        },
        src: 'build/css/style.css',
      },
    },

    csso: {
      styleMin: {
        options: {
          report: 'gzip',
        },
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
      },
    },

    concat: {
      options: {
        separator: '\n',
        stripBanners: true,
        banner: "'use strict';\n\n",
      },
      dist: {
        files: {
          'source/js/index.js': ['source/js/index/*.js'],
        },
      },
    },

    uglify: {
      options: {
        mangle: false,
        expand: true,
      },
      jsMin: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: '*.js',
          dest: 'build/js',
        }],
      },
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        prefix: 'icon-',
        svg: {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
        },
      },
      svgSprite: {
        files: {
          'source/image/min/sprite.svg': ['source/image/min/*.svg'],
        },
      },
    },

    cwebp: {
      imagesWebp: {
        options: {
          q: 90,
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'source/image/min/',
        }],
      },
    },

    image: {
      imageMin: {
        options: {
          optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
          pngquant: ['--speed=1', '--force', 256],
          zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
          jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
          mozjpeg: ['-optimize', '-progressive'],
          guetzli: ['--quality', 85],
          gifsicle: ['--optimize'],
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'source/image/min/',
        }],
      },
    },

    prettify: {
      options: {
        config: '.prettifyrc',
      },
      files: {
        expand: true,
        cwd: 'build/',
        ext: '.html',
        src: ['*.html'],
        dest: 'build/',
      },
    },

    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*.html', '*.html'],
          dest: 'build',
        }],
      },
    },

    realFavicon: {
      favicons: {
        src: 'TODO: Path to your master picture',
        dest: 'TODO: Path to the directory where to store the icons',
        options: {
          iconsPath: '/',
          html: [ 'TODO: List of the HTML files where to inject favicon markups' ],
          design: {
            ios: {
              pictureAspect: 'noChange',
              assets: {
                ios6AndPriorIcons: true,
                ios7AndLaterIcons: true,
                precomposedIcons: true,
                declareOnlyDefaultIcon: true
              }
            },
            desktopBrowser: {
              design: 'raw'
            },
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#da532c',
              onConflict: 'override',
              assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                  small: true,
                  medium: true,
                  big: true,
                  rectangle: true
                }
              }
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor: '#ffffff',
              manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor: '#5bbad5'
            }
          },
          settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: true,
            usePathAsIs: false
          }
        }
      }
    }

    clean: {
      buildClean: {
        src: ['build/'],
      },
      buildCleanStyleDev: {
        src: ['build/css/'],
      },
      buildCleanJsDev: {
        src: ['build/js/'],
      },
      buildCleanHtmlDev: {
        src: ['build/*.html'],
      },
    },

    ttf2woff2: {
      default: {
        src: ['source/fonts/ttf/*.ttf'],
        dest: 'source/fonts/woff2/',
      },
    },

    copy: {
      buildCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*.html',
            'fonts/woff2/*',
            'image/min/*',
            'css/style.css',
            'js/*.js',
          ],
          dest: 'build/',
        }],
      },
      buildStyleCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'css/style.css',
          ],
          dest: 'build/',
        }],
      },
      buildJsCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'js/*.js',
          ],
          dest: 'build/',
        }],
      },
      buildHtmlCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*.html',
          ],
          dest: 'build/',
        }],
      },
    },
  });

  grunt.registerTask('serve', [
    'less',
    'concat',
    'browserSync:serverSync',
    'concurrent:targetWatch',
  ]);

  grunt.registerTask('serveDev', [
    'less',
    'concat',
    'clean:buildClean',
    'copy:buildCopy',
    'postcss',
    'csso',
    'uglify',
    'htmlmin',
    'browserSync:serverSyncDev',
    'concurrent:targetWatchDev',
  ]);

  grunt.registerTask('imgpress', [
    'cwebp',
    'image',
    'svgstore',
  ]);

  grunt.registerTask('build', [
    'less',
    'concat',
    'clean:buildClean',
    'copy:buildCopy',
    'postcss',
    'csso',
    'uglify',
    'htmlmin',
  ]);
};
