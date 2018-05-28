// ++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ++
//
//
//     _____     __        ____
//    / ___/__  / /  ___ _/ / /_
//   / /__/ _ \/ _ \/ _ `/ / __/
//   \___/\___/_.__/\_,_/_/\__/
//
//   Cobalt is built by Mike Busby
//
//   hello@mikebusby.ca
//   @mikebusby
//
//
// ++ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ++

// Require Gulp & Plugins
var gulp            = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");

// Rename some plugins
var plugins = gulpLoadPlugins({
  rename: {
    "gulp-bower": "bower",
    "gulp-file-include": "fileinclude",
    "gulp-autoprefixer": "autoprefixer",
    "gulp-inline-css": "inlinecss"
  }
});

// Config Variables
var config = {
  srcPath:   "src/",
  buildPath: "www/",
  tplPath:   "src/tpl/"
}

// Output errors to console
function errorLog(error) {
  console.error.bind(error);
  plugins.notify().write(error);
  this.emit("end");
}



//
// HTML Compliation
//
gulp.task('html', function() {
  gulp.src([config.tplPath + "*.html"])
    .pipe(plugins.fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(plugins.inlinecss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeLinkTags: true,
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest(config.buildPath));
});



//
// Web Server
//
gulp.task("webserver", function() {
  gulp.src(config.buildPath)
    .pipe(plugins.webserver({
      port: 1337,
      livereload: true
    }));
});



//
// Move Images to build
//
gulp.task("copyimg", function() {
  gulp.src(config.srcPath + "/img/*")
  .pipe(gulp.dest(config.buildPath + "img/"));
});




//
// Watch File changes
//
gulp.task("watch", function() {
  gulp.watch(config.srcPath + "img/*", ["copyimg"]);
  gulp.watch(config.tplPath + "**/*.html", ["html"]);
  gulp.watch(config.srcPath + "css/*.css", ["html"]);
});



//
// Run Tasks | $ gulp
//
gulp.task("default", [
  "html",
  "copyimg",
  "watch",
  "webserver"
]);
