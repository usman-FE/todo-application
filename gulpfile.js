// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
  return src('app/js/script.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }));
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
