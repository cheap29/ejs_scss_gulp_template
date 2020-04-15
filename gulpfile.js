var gulp = require("gulp");
var ejs = require("gulp-ejs");
var sass = require("gulp-sass");
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var mmq = require('gulp-merge-media-queries');
var browserSync = require("browser-sync");
var rename       = require('gulp-rename');
var rimraf       = require('rimraf');
var ejs          = require('gulp-ejs');

var dist_dir = './dist';
var src_dir = './src';

/**
 * browsersync
 */
gulp.task('browsersync', function() {
    browserSync({
        server: {
            baseDir: dist_dir
        }
    });
});

/**
 * Sass build
 */
gulp.task( "sass", function () {
    return gulp.src( src_dir + '/scss/*.scss' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( dist_dir + '/css' ));
});

/**
 * Ejs build
 */
gulp.task( "ejs", function () {
    return gulp.src([src_dir + "/ejs/**/*.ejs", '!' + src_dir + "/ejs/**/_*.ejs"])
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe( gulp.dest(  dist_dir + '/' ) );
});

/**
 * Copy js
 */
gulp.task('js',  function() {
    return gulp.src(src_dir + '/js/**/*')
        .pipe(gulp.dest(dist_dir + "/js"));
});

/**
 * Copy images
 */
gulp.task('images',  function() {
    return gulp.src(src_dir + '/images/**/*')
        .pipe(gulp.dest(dist_dir + "/images"));
});

/**
 * Copy lib
 */
gulp.task('lib', function () {
    return gulp.src(src_dir + '/lib/**/*')
        .pipe(gulp.dest(dist_dir + "/lib"));
});

/**
 * watch
 */
gulp.task('watch', function () {
    gulp.watch(src_dir + '/scss/*.scss'),
    gulp.watch(src_dir + '/ejs/*ejs');
});

/**
 * Clean files
 */
gulp.task('clean', function(cb) {
    rimraf(dist_dir + "/js", cb);
    rimraf(dist_dir + "/images", cb);
    rimraf(dist_dir + "/lib", cb);
});


gulp.task('copy',  gulp.parallel('images', 'js', 'lib'));
gulp.task('build',  gulp.parallel('sass', 'ejs', 'images'));
gulp.task('default', gulp.series('clean','copy','build', 'browsersync', 'watch'));