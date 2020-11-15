"use strict";
const gulp = require('gulp'),
  /* HTML */
  fileinclude = require('gulp-file-include'),

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
    .pipe(fileinclude({
      prefix: "@@",
      basepath: './src/components'
    }))
    .pipe(gulp.dest('./dist/filter'));
});
/****************************************************/
/* css */
/****************************************************/
gulp.task('build:css', function() {
  return gulp
    .src(['./src/*.css', './src/components/**/*.css'])
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/filter'));
});

/****************************************************/
/* js */
/****************************************************/
gulp.task('build:js', function() {
  return gulp
    .src('./src/*.js')
    .pipe(gulp.dest('./dist/filter'));
});

/****************************************************/
/* source */
/****************************************************/
gulp.task('copy:source', function() {
  return gulp
    .src('./src/source/*')
    .pipe(gulp.dest('./dist/filter/source'));
});

/****************************************************/
/* common */
/****************************************************/
gulp.task('build', gulp.parallel('build:html', 'build:css', 'build:js', 'copy:source'));

/****************************************************/
/* watch */
/****************************************************/
gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', gulp.series('build:html'));
  gulp.watch('./src/**/*.css', gulp.series('build:css'));
  gulp.watch('./src/**/*.js', gulp.series('build:js'));
});

/****************************************************/
/* browserSync */
/****************************************************/
gulp.task('serve', function() {
  browserSync.init({
    server: './dist/filter'
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
