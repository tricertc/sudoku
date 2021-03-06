module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          base: 'public',
          port: 8888,
          keepalive: true
        }
      }
    },
    jasmine: {
      src: 'public/js/*.js',
      options: {
        specs: 'tests/specs/*.spec.js'
      }
    },
    jshint: {
      files: ['public/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    open: {
      dev: {
        path: 'http://127.0.0.1:<%=connect.dev.options.port%>/index.html',
        app: 'chrome'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['open:dev', 'connect:dev']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
};