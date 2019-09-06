//
// Localhost server task
//

const browserSync = require('browser-sync');

module.exports = function() {
  return function() {
    const stream = 
      browserSync.init({
        server: {
          baseDir: './dist',
          directory: true
        },
        open: false,
        notify: false,
        port: 1337,
        watch: true,
      });
    
    return stream;
  }
}