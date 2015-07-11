var gulp = require('gulp'),
    karma = require('karma').server,
    plumber = require('gulp-plumber'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jsdoc = require("gulp-jsdoc");

PATHS = {
    JS: {
	    SRC:[ 
            'lib/*.js'
	    ]
    },
    MAPS: {
        JS: 'app/source/'
    },

}

var jsDocTemplateOptions = {
    path: 'ink-docstrap',
    systemName: 'nasa-climate-data',
    navType: 'vertical',
    theme: 'spacelab',
    linenums: true,
    collapseSymbols: false,
    inverseNav: false
};

gulp.task('docs', function () {
    gulp.src(PATHS.JS.SRC)
	.pipe(jsdoc.parser())
	.pipe(jsdoc.generator('./app/docs',jsDocTemplateOptions))
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
});

// build the main source into the min file
gulp.task('js-lint', function () {
    return gulp.src(PATHS.JS.SRC)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build', function () {
    return gulp.src(PATHS.JS.SRC)
        .pipe(uglify())
        .pipe(gulp.dest('./app/scripts/lib/ncd.js'));
});

