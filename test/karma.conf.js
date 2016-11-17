// Karma configuration
// Generated on Wed Nov 02 2016 17:50:05 GMT+0800 (Malay Peninsula Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/abdmob/x2js/xml2json.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/prism/prism.js',
      'bower_components/ace-builds/src-min-noconflict/ace.js',
      'bower_components/angular-ui-ace/ui-ace.js',
      // endbower

      // node:js
      'node_modules/angular-mocks/angular-mocks.js',
      // endnode

      // injector:js,
      'src/app.js',
      'src/core/*.js',
      'src/directives/*.js',
      'src/filters/*.js',
      'src/app/lesson/lesson-controller.js',
      'src/app/module/module-controller.js',
      'wwwroot/dist/demo.app.templates.js',
      // endinjector

      //'tests/mocks/**/*.js',
      'test/specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'demo.app.templates'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
