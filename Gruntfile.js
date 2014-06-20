/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    compass: {
      dist: {
        options: {
          require: 'susy',
          httpPath: '',
          cssDir: 'dist/css/',
          sassDir: 'sass/',
          imagesDir: 'dist/images/',
          javascriptsDir: 'dist/js/',
          fontsDir: 'dist/fonts/',
          outputStyle: 'compressed'
        }
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      js: {
        src: [
          'bower_components/jquery/jquery.js',
          'js/main.js'
        ],
        dest: 'dist/js/scripts.min.js'
      },
      css: {
        src: [
          'bower_components/normalize.css/normalize.css',
          'dist/css/styles.css'
        ],
        dest: 'dist/css/styles.css'
      }
    },
    uglify: {
      dist: {
        src: [          
          'dist/js/script.min.js'
        ],
        dest: 'dist/js/script.min.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.css'
      }
    },
    watch: {
      compass: {
        files: [
          'sass/**/**'          
        ],
        tasks: ['compass', 'concat:css'],
        options: {
          livereload: true,
          outputStyle: 'compressed'
        }
      },
      views: {
        files: [
          'dist/*.html'          
        ],
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          'js/*.*',
        ],
        tasks: ['concat:js'],
        options: {
          livereload: true
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/'
        }]
      }
    },
    connect: {
      options: {
        port: 9004,
        livereload: 35729,
        open: true
      },
      livereload: {
        options: {
          open: true,
          base: 'dist/'
        }
      }      
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['imagemin', 'concat', 'compass', 'uglify']);
  grunt.registerTask('push-gh-pages', ['imagemin', 'compass', 'concat', 'uglify', 'cssmin', 'gh-pages']);
  grunt.registerTask('server', ['connect', 'watch']);
};