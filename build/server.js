//
// Localhost server task
//

module.exports = function(gulp, plugins, config) {
  return function () {
    gulp
      .src(config.buildPath)
      .pipe(plugins.webserver({
        port: 1337,
        fallback: 'template.html',
        directoryListing: {
          enable: true,
          path: 'www'
        },
        livereload: true
      })
    );
  }
}