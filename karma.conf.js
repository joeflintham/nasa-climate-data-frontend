module.exports = function(config) {

    config.set({
        
        basePath : './',
        
        frameworks: ['mocha', 'chai'],
        
        plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-coverage',
            'karma-mocha-reporter'
        ],

        browsers : ['PhantomJS'],

        // reporter options
        mochaReporter: {
            output: 'full'
        },

        files: [
            'bower_components/leaflet/dist/leaflet-src.js',
            'bower_components/d3/d3.js',
            'lib/*.js',
            'tests/*.js'
	    ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'lib/*.js': ['coverage']
        },

        coverageReporter: {
            type : 'html',
            dir : 'app/coverage/'
        }
        
    });
    
};


