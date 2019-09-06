//
// CSS inline build task
//

const inlineCSS = require('gulp-inline-css');

module.exports = function(gulp, plugins, config) {
  return function() {
    const stream =
      gulp.src(config.buildPath + '**/*.html')
        .pipe(
          plugins.plumber({
            errorHandler: function(err) {
              plugins.notify.onError({
                title: 'Gulp error in ' + err.plugin,
                message: err.toString()
              })(err);
            }
          })
        )
        .pipe(
          inlineCSS({
            removeStyleTags: false,
            preserveMediaQueries: true
          })
        )
        .pipe(gulp.dest(config.buildPath));
        
    return stream;
  }
}