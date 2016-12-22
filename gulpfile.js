const gulp = require('gulp');
const del = require('del');
// const exec = require('child_process').exec;
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const connect = require('gulp-connect');

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
    //  serverSrcJs: 'src/server/**/*.js?(x)',
    //  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client.js',
  clientBundle: 'public/js/bundle.js?(.map)',
  gulpFile: 'gulpfile.js',
  webpackFile: 'webpack.config.js',
  libDir: 'lib',
  distDir: 'public/js',
};

gulp.task('clean', () => del([paths.libDir, paths.clientBundle]));

gulp.task('lint', function() {
  return gulp.src([paths.allSrcJs, paths.gulpFile, paths.webpackFile])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('pack', ['clean', 'lint'], () => {
  return gulp.src(paths.clientEntryPoint)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(paths.distDir));
});

gulp.task('build', ['clean', 'lint', 'pack']);

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['build']);
});

gulp.task('connect', ['build'], () => {
  connect.server({
    root: ['public'],
    port: 5000,
    livereload: true,
  });
});

gulp.task('default', ['watch', 'build', 'connect']);
