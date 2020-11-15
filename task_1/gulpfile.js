"use strict";
const gulp = require('gulp'),
  /* CSS */
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-minify-css'),

  /* Common */
  concat = require('gulp-concat'),

  /* watch */
  browserSync = require('browser-sync').create();

/****************************************************/
/* html */
/****************************************************/
gulp.task('build:html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./dist'));
});
/****************************************************/
/* css */
/****************************************************/
gulp.task('build:css', function() {
  return gulp
    .src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
});

/****************************************************/
/* img */
/****************************************************/
gulp.task('build:img', function() {
  return gulp
    .src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
});

/****************************************************/
/* js */
/****************************************************/
gulp.task('build:js', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
});

/****************************************************/
/* common */
/****************************************************/
gulp.task('build', gulp.parallel('build:html', 'build:css', 'build:img', 'build:js'));

/****************************************************/
/* browserSync */
/****************************************************/
gulp.task('serve', function() {
  browserSync.init({
    server: './dist'
  });
  browserSync.watch('./dist/**/*.*')
    .on('change', browserSync.reload);
})

/****************************************************/
/* watch */
/****************************************************/
gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', gulp.series('build:html'));
  gulp.watch('./src/**/*.css', gulp.series('build:css'));
  gulp.watch('./src/**/*.js', gulp.series('build:js'));
});

/****************************************************/
/* dev */
/****************************************************/
gulp.task('dev', gulp.parallel('watch', 'serve'));

/****************************************************/
/* start */
/****************************************************/
gulp.task('start', gulp.series('build', 'dev'));
