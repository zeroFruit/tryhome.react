const path          = require('path');
const gulp          = require('gulp');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssvars       = require('postcss-simple-vars');
const nested        = require('postcss-nested');
const cssImport     = require('postcss-import');
const mixins        = require('postcss-mixins');
const hexrgba       = require('postcss-hexrgba');

gulp.task('styles', () => {
  return gulp.src('./assets/styles/style.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', err => {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./temp/styles'));
})
