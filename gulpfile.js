var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var replace = require("gulp-replace");
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

var path = {
  HTML: './app/index.html',
  DEST: 'dist/',
  JS_ENTRY_POINT: './app/modules/app/app.react.js',
  JS_OUT: 'build.js',
  JS_MINIFIED_OUT: 'build.min.js',
  SASS_ENTRY_POINT: './app/modules/app/app.scss',
  SASS_OUT: 'build.css',
  SASS_MINIFY_OUT: 'build.min.css',
  ASSETS: ['./node_modules/font-awesome/fonts/**']
};
 
gulp.task('copyHTML', function( ){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copyAssets', function( ){
  gulp.src(path.ASSETS)
    .pipe(gulp.dest(path.DEST + '/assets'));
});

gulp.task('css', function() {
  return gulp.src(path.SASS_ENTRY_POINT)
    .pipe(sass({ includePaths : ['../**/*.scss', '../../../node_modules/font-awesome/**'] }))
    .pipe(sass({sourcemap: true}))
    .pipe(sass({ style: 'expanded' }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(replace('../fonts/', './assets/'))
    .pipe(rename(path.SASS_OUT))
    .pipe(gulp.dest(path.DEST));
});

var preprocessJS = browserify({
    entries: [path.JS_ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

gulp.task('js', function() {
  return preprocessJS.bundle()
  .pipe(source(path.JS_OUT))
  .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copyHTML']);
  gulp.watch('./app/modules/**/*.scss', ['css']);

  return watchify(preprocessJS).on('update', function () {
    preprocessJS.bundle()
      .pipe(source(path.JS_OUT))
      .pipe(gulp.dest(path.DEST));
      console.log('updated');
  })
    .bundle()
    .pipe(source(path.JS_OUT))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('buildJS', function() {
    browserify({
      entries: [path.JS_ENTRY_POINT],
      transform: [reactify],
    })
    .bundle()
    .pipe(source(path.JS_MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('buildCSS', ['css'], function () {
  return gulp.src(path.DEST + '/' + path.SASS_OUT)
  .pipe(minifycss())
  .pipe(rename(path.SASS_MINIFY_OUT))
  .pipe(gulp.dest('dist'));
});

gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(replace('build.js', 'build.min.js'))
    .pipe(replace('build.css', 'build.min.css'))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('cleanDev', function() {
    return gulp.src([path.DEST + 'build.js', path.DEST + 'build.css'])
      .pipe(clean());
});

gulp.task('prod', ['copyHTML', 'copyAssets', 'replaceHTML', 'buildJS', 'buildCSS']); //+ cleanDev
gulp.task('dev', ['copyHTML', 'copyAssets', 'js', 'css']);

gulp.task('default', ['watch']);
