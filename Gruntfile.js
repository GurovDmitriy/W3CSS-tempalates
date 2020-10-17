module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    concurrent: {
      targetWatch: ['watch:styleWatch'],
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
      HtmlWatchDev: {
        files: ['source/**/*.html'],
        tasks: ['clean:buildCleanHtmlDev', 'copy:buildHtmlCopy', 'htmlmin'],
      },
      styleWatchDev: {
        files: ['source/less/**/*.less'],
        tasks: ['less:lessBuild', 'clean:buildCleanStyleDev', 'copy:buildStyleCopy', 'cssmin'],
      },
      jsWatchDev: {
        files: ['source/js/**/*.js'],
        tasks: ['clean:buildCleanJsDev', 'copy:buildJsCopy', 'uglify'],
      },
    },

    browserSync: {
      serverSync: {
        bsFiles: {
          src: ['source/**/*.html', 'source/css/*.css', 'source/js/*.js'],
        },
        options: {
          server: 'source/',
          watchTask: true,
        },
      },
      serverSyncDev: {
        bsFiles: {
          src: ['docs/**/*.html', 'docs/css/*.css', 'docs/js/*.js'],
        },
        options: {
          server: 'docs/',
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
      lessBuild: {
        options: {
          relativeUrls: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ],
        },
        files: {
          'source/css/style.css': 'source/less/style.less',
        },
      },
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'docs/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'docs/css/',
        }]
      }
    },

    uglify: {
      options: {
        mangle: false,
        expand: true,
      },
      jsMin: {
        files: [{
          expand: true,
          cwd: 'docs/js',
          src: '*.js',
          dest: 'docs/js',
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
          q: 70,
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
      svgMin: {
        options: {
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.svg'],
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
        cwd: 'docs/',
        ext: '.html',
        src: ['*.html'],
        dest: 'docs/',
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
          cwd: 'docs',
          src: ['**/*.html', '*.html'],
          dest: 'docs',
        }],
      },
    },

    ttf2woff2: {
      default: {
        src: ['source/fonts/ttf/*.ttf'],
        dest: 'source/fonts/woff2/',
      },
    },

    clean: {
      buildClean: {
        src: ['docs/'],
      },
      buildCleanStyleDev: {
        src: ['docs/css/'],
      },
      buildCleanJsDev: {
        src: ['docs/js/'],
      },
      buildCleanHtmlDev: {
        src: ['docs/*.html'],
      },
    },

    copy: {
      buildCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*',
            '*.xml',
            '*.html',
            'fonts/woff2/*',
            'image/min/*',
            'works/**/*',
            'image/favicon/*',
            'css/style.css',
            'js/*.js',
          ],
          dest: 'docs/',
        }],
      },
      buildStyleCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'css/style.css',
          ],
          dest: 'docs/',
        }],
      },
      buildJsCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'js/*.js',
          ],
          dest: 'docs/',
        }],
      },
      buildHtmlCopy: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            '*.html',
          ],
          dest: 'docs/',
        }],
      },
    },
  });

  grunt.registerTask('serve', [
    'less',
    'browserSync:serverSync',
    'concurrent:targetWatch',
  ]);

  grunt.registerTask('serveDev', [
    'less:lessBuild',
    'clean:buildClean',
    'copy:buildCopy',
    'cssmin',
    'uglify',
    'htmlmin',
    'browserSync:serverSyncDev',
    'concurrent:targetWatchDev',
  ]);

  grunt.registerTask('imgpress', [
    'cwebp',
    'image.imageMin',
    'svgstore',
  ]);

  grunt.registerTask('svgsprite', [
    'image:svgMin',
    'svgstore',
  ]);

  grunt.registerTask('build', [
    'less:lessBuild',
    'clean:buildClean',
    'copy:buildCopy',
    'cssmin',
    'uglify',
    'htmlmin',
  ]);
};
