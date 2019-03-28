// ++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ++
//
//     _____     __        ____    ____           _ __
//    / ___/__  / /  ___ _/ / /_  / __/_ _  ___ _(_) /
//   / /__/ _ \/ _ \/ _ `/ / __/ / _//  ' \/ _ `/ / / 
//   \___/\___/_.__/\_,_/_/\__/ /___/_/_/_/\_,_/_/_/  
//
//   Cobalt is built by Mike Busby
//
//   hello@mikebusby.email
//   @mikebusby
//
// ++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ++

// Require Gulp & Plugins
const gulp = require('gulp');
const runSequence = require('run-sequence');
const plugins = require('gulp-load-plugins')();

// Config variables
let config = {
  srcPath: 'src/',
  buildPath: 'www/',
  staticPath: 'src/static/',
  tplPath: 'src/tpl/',
  cssType: 'css' // CSS (PostCSS) or SCSS
}

// Main Tasks
gulp.task('html', require('./build/html')(gulp, plugins, config));
gulp.task('styles', require('./build/' + config.cssType)(gulp, plugins, config));
gulp.task('inline-css', require('./build/inline-css')(gulp, plugins, config));
gulp.task('copy-img', require('./build/copy-img')(gulp, config));
gulp.task('web-server', require('./build/server')(gulp, plugins, config));

// Watch file changes
gulp.task('watch', function() {
  gulp.watch(config.srcPath + '/**/*', ['update']);
  gulp.watch(config.staticPath + 'img/*', ['copy-img']);
});

// Update build files on file change
gulp.task('update', function(callback) {
  runSequence('styles', 'html', 'inline-css', callback);
});

// Run development tasks
gulp.task('default', function(callback) {
  runSequence(
    'styles',
    'html',
    'inline-css',
    'copy-img',
    'watch',
    'web-server',
    callback
  );
});
