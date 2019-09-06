//
// HTML build task
//

const fileinclude = require('gulp-file-include');

module.exports = function(gulp, plugins, config) {
  return function() {
    const stream = 
      gulp.src([
        config.tplPath + '**/*.html',
        '!' + config.tplPath + '_**/_*/',
        '!' + config.tplPath + '**/_*/**/*'
      ])
      .pipe(plugins.plumber({
        errorHandler: function(err) {
          plugins.notify.onError({
            title: 'Gulp error in ' + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(fileinclude({
        prefix: '@@',
        basepath: 'src/tpl/',
        context: {
          'tblProps': 'border="0" cellpadding="0" cellspacing="0"'
        }
      }))
      .pipe(gulp.dest(config.buildPath));
    
    return stream;
  }
}