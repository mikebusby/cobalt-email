//
// CSS inline build task
//

const inlineCSS = require('gulp-inline-css');

module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp
      .src(config.buildPath + '**/*.html')
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
          applyTableAttributes: true,
          preserveMediaQueries: true
        })
      )
      .pipe(plugins.htmlmin({ collapseWhitespace: true, minifyCSS: true }))
      .pipe(gulp.dest(config.buildPath));
  }
}