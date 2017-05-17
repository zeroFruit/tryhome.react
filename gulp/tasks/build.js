const gulp    = require('gulp');
const del     = require('del');
const exec    = require('gulp-exec');
const uglify  = require('gulp-uglify');

gulp.task('deleteDistFolder', () => {
  return del('./dist/*');
});

gulp.task('deleteTempFolder', () => {
  return del('./temp/**/*');
})
gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
  let pathsToCopy = [
    './assets/html/invalid.html',
    './assets/html/index.html',
    './temp/styles/style.css'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', ['styles', 'deleteDistFolder', 'copyGeneralFiles']);
