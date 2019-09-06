//
// PostCSS build task
//

// Include PostCSS plugins
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssColorMod = require('postcss-color-mod-function');
const postcssNested = require('postcss-nested');
const mixins = require('postcss-sassy-mixins');
const conditionals = require('postcss-conditionals')
const rucksack = require('rucksack-css');
const cssnano = require('cssnano');

module.exports = function(gulp, plugins, config) {
  return function() {
    const stream =
      gulp.src(config.srcPath + '/css/main.css')
      .pipe(plugins.plumber({
        errorHandler: function(err) {
          plugins.notify.onError({
            title: 'Gulp error in ' + err.plugin,
            message: err.toString()
          })(err);
        }
      }))
      .pipe(plugins.postcss([
        postcssImport(),
        postcssPresetEnv({
          stage: 1,
          features: {
            'custom-properties': {
              preserve: false,
              warnings: true
            }
          }
        }),
        postcssColorMod(),
        mixins(),
        postcssNested(),
        conditionals(),
        rucksack(),
        cssnano(),
      ], { syntax: require('postcss-scss') }))
      .pipe(gulp.dest(config.buildPath + 'css/'));

    return stream;
  }
}