var gulp = require('gulp'),
    karma = require('karma').server,
    plumber = require('gulp-plumber'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade');

PATHS = {
	SRC:{ 
        JS: [
            'lib/*.js'
	    ],
        STYL: [
            'stylus/*.styl'
        ],
        JADE: [
            'jade/*.jade'
        ],
        VENDOR: {
            JS: [
                'bower_components/leaflet/dist/leaflet.js',
                'bower_components/d3/d3.js',
            ],
            CSS: [
                'bower_components/leaflet/dist/leaflet.css',
            ]
        },
    },
    MAPS: {
        JS: 'source/'
    },

}


gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
});

// build the main source into the min file
gulp.task('js-lint', function () {
    return gulp.src(PATHS.SRC.JS)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build', function () {
    
    gulp.src(PATHS.SRC.VENDOR.JS)
        .pipe(gulp.dest('app/scripts/vendor/'));
    
    gulp.src(PATHS.SRC.VENDOR.CSS)
        .pipe(gulp.dest('app/styles/vendor/'));
    
    gulp.src(PATHS.SRC.STYL)
        .pipe(stylus())
        .pipe(gulp.dest('app/styles/'))

    gulp.src(PATHS.SRC.JADE)
        .pipe(jade())
        .pipe(gulp.dest('app/'));
    
});

