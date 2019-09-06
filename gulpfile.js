// ++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ++
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
const plugins = require('gulp-load-plugins')();

// Config variables
let config = {
  srcPath: 'src/',
  buildPath: 'dist/',
  staticPath: 'src/static/',
  tplPath: 'src/tpl/',
  cssType: 'css' // CSS (PostCSS) or SCSS
}

// Main tasks
gulp.task('html', require('./build/html')(gulp, plugins, config));
gulp.task('styles', require('./build/' + config.cssType)(gulp, plugins, config));
gulp.task('inline-css', require('./build/inline-css')(gulp, plugins, config));
gulp.task('copy-img', require('./build/copy-img')(gulp, config));
gulp.task('web-server', require('./build/server')(gulp, plugins, config));

// Watch file changes
gulp.task('watch', function() {
  gulp.watch(config.srcPath + '**/*', gulp.series('update'));
  gulp.watch(config.staticPath + 'img/*', gulp.series('copy-img'));
});

// Update build files on file change
gulp.task('update', gulp.series(
  'styles',
  'html',
  'inline-css'
));

// Run build tasks
gulp.task('default', gulp.series(
  'styles',
  'html',
  'inline-css',
  'copy-img'
));

// Run development tasks
gulp.task('dev', gulp.parallel(
  'watch',
  'web-server'
));
