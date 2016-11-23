const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
//  serverSrcJs: 'src/server/**/*.js?(x)',
//  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'lib/client.js',
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

gulp.task('babel', ['clean', 'lint'], () => {
  return gulp.src(paths.allSrcJs).pipe(babel()).pipe(gulp.dest(paths.libDir));
});

gulp.task('pack', ['clean', 'lint', 'babel'], () => {
  return gulp.src(paths.clientEntryPoint)
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest(paths.distDir));
});

gulp.task('build', ['clean', 'lint', 'pack', 'babel']);

gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.libDir}`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
