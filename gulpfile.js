// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const browsersync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
// function jsTask() {
//   return src('app/js/script.js', { sourcemaps: true })
//     .pipe(babel({ presets: ['@babel/preset-env'] }))
//     .pipe(terser())
//     .pipe(dest('dist/js', { sourcemaps: '.' }));
// }

function jsTask() {
  return browserify({
    entries: 'app/js/' + 'script.js',
  })
    .transform(babelify, {
      presets: ['@babel/preset-env'],
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'));
}

// Images optimization
function imageOptimize() {
  return src('images/**/*.{jpg,png,svg}')
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.optipng({
          optimizationLevel: 2,
        }),
      ])
    )
    .pipe(dest('dist/images'));
}

// Images conversion
function webpImage() {
  return src('dist/images/**/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'));
}

// COPY HTML TO DIST
function copyHTML() {
  return src('*.html').pipe(dest('dist'));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: 'dist',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', copyHTML);
  watch('dist/*.html', browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js', 'images/**/*.{jpg,png,svg}'],
    series(scssTask, jsTask, imageOptimize, webpImage, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(
  copyHTML,
  scssTask,
  jsTask,
  imageOptimize,
  webpImage,
  browserSyncServe,
  watchTask
);

// Build Gulp Task
exports.build = series(copyHTML, scssTask, jsTask, imageOptimize, webpImage);
