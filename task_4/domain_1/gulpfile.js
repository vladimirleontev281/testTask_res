"use strict";
const gulp = require('gulp'),
  /* CSS */
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-minify-css'),

  /* JS */
  gulpWebpack = require('webpack-stream'),

  /* Common */
  concat = require('gulp-concat'),

  /* watch */
  browserSync = require('browser-sync').create();

/****************************************************/
/* WEBPACK */
/****************************************************/
let webpackConfig  = require('./webpack.config.js');
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
    // .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

/****************************************************/
/* js */
/****************************************************/
gulp.task('build:js', function() {
  return gulp
    .src('./src/js/index.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('./dist'))
});
/****************************************************/
/* common */
/****************************************************/
gulp.task('build', gulp.parallel('build:html', 'build:css', 'build:js'));

/****************************************************/
/* watch */
/****************************************************/
gulp.task('watch', function() {
  gulp.watch('./src/*.html', gulp.series('build:html'));
  gulp.watch('./src/css/*.css', gulp.series('build:css'));
  gulp.watch('./src/js/*.js', gulp.series('build:js'));
});

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
/* dev */
/****************************************************/
gulp.task('dev', gulp.parallel('watch', 'serve'));

/****************************************************/
/* start */
/****************************************************/
gulp.task('start', gulp.series('build', 'dev'));
