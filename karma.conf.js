var path = require('path');
module.exports = function(config) {

  config.set({

    basePath: './',
    
    frameworks: ['mocha', 'chai'],
    
    plugins : [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-webpack',
      'karma-babel-preprocessor'
    ],

    browsers : ['Chrome'],
    
    webpack: {
      entry: './lib/main.js',
      module: {
        loaders: [
          {
            test: path.join(__dirname, 'lib'),
            loader: 'babel'
          }
        ]
      }
    },

    // reporter options
    mochaReporter: {
      output: 'full'
    },

    files: [
      './bower_components/leaflet/dist/leaflet-src.js',
      './bower_components/d3/d3.js',
      './lib/*.js',
      './tests/*-spec.js'
	  ],

    reporters: ['progress', 'coverage'],

    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    
    preprocessors: {
      '../lib/*.js': ['babel','webpack'],
      '../tests/*-spec.js': ['babel'],
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // enable / disable watching file and executing tests on file changes
    autoWatch: false,

 
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

    
  });
  
};


