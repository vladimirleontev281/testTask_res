"use strict";
const gulp = require('gulp'),
  /* CSS */
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),

  /* Common */
  concat = require('gulp-concat');

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
gulp.task('convert:sass', function() {
  return gulp
    .src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});
gulp.task('create:css', function() {
  return gulp
    .src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist'));
});
gulp.task('build:css', gulp.series('convert:sass', 'create:css'));

/****************************************************/
/* js */
/****************************************************/
gulp.task('build:js', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist'));
});
/****************************************************/
/* source */
/****************************************************/
gulp.task('copy:source', function() {
  return gulp
    .src('./src/source/*')
    .pipe(gulp.dest('./dist/source'));
});
/****************************************************/
/* common */
/****************************************************/
gulp.task('build', gulp.parallel('build:html', 'build:css', 'build:js', 'copy:source'));

/****************************************************/
/* watch */
/****************************************************/
gulp.task('watch', function() {
  gulp.watch('./src/*.html', gulp.series('build:html'));
  gulp.watch('./src/css/*.css', gulp.series('create:css'));
  gulp.watch('./src/css/*.scss', gulp.series('convert:sass'));
  gulp.watch('./src/js/*.js', gulp.series('build:js'));
  gulp.watch('./src/source/*', gulp.series('copy:source'));
});
