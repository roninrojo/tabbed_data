'use strict';

/* REQUERIMENTS */

const gulp = require('gulp');
const gutil = require('gulp-util');

var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');


/* CONFIG */

var dev = {
	base: ".",
	html : "./**/*.html",
	css : "./css/*.?(s)css",
	sass : "./assets/sass/*.scss",
	js : "./assets/js/*.js"
};

var dest = {
	base: "dest",
	css : "dest/css",
	js : "dest/js"
}

/* DEV */

// Browsrsync

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
        files: './**', // watch the build directory for changes
        port: 4000 // optional, set it for a specific port
    })
});

// Watch

 gulp.task('watch', function () {
 	gulp.watch([dev.sass], ['sass']);
 	gulp.watch([dev.js], ['sass']);
 	gulp.watch(['./gulpfile.js']);
 	gulp.watch(['index.html'], ['sass']);
 });

// Styles

gulp.task('sass', function(){
    return gulp.src([dev.sass])
    .pipe(sass({
        onError: browserSync.notify
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream: true }))
});

/* PRODUCTION */

gulp.task('sass-prod', function () {
return gulp.src([dev.sass])
	.pipe(sass({
		onError: browserSync.notify
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cssnano())
	.pipe(gulp.dest([dest.css]))
});

// Scripts

gulp.task('js-prod', function() {
  return gulp.src(['./dest/js/*.js'])
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest([dest.js]))
});


// Minify HTML 

gulp.task('html-prod', function() {
	return gulp.src('./dest/**/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	// .pipe(minifyInline())
	.pipe(gulp.dest([dest.base]));
});


/* MAIN TASKS */

 gulp.task('default',['sass','browser-sync','watch']);

/* PRODUCTION */

gulp.task('build', function() {
 	runSequence(['sass-prod','html-prod','js-prod']);
});

