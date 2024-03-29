const gulp         = require('gulp');

const scss           = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const imagemin       = require('gulp-imagemin');
const rename         = require('gulp-rename');
const nunjucksRender = require('gulp-nunjucks-render');
const del            = require('del');
const browserSync    = require('browser-sync').create();


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function nunjucks() {
  return gulp.src('app/*.njk')
  .pipe(nunjucksRender())
  .pipe(gulp.dest('app'))
  .pipe(browserSync.stream())
}

function styles() {
  return gulp.src('app/scss/*.scss')
  .pipe(scss({ outputStyle: 'compressed' }))
  // .pipe(concat())
  .pipe(rename({
    suffix : '.min'
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 versions'],
    grid: true
  }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.stream())
}

function images() {
  return gulp.src('app/images/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 75,progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false}
      ]
    })
  ]))
  .pipe(gulp.dest('dist/images'))
}

function build() {
  return gulp.src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(gulp.dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  gulp.watch(['app/**/*.scss'], styles);
  gulp.watch(['app/*.njk'], nunjucks);
  gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  gulp.watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles  = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.nunjucks = nunjucks;
exports.cleanDist = cleanDist;

exports.build = gulp.series(cleanDist, images, build);
exports.default = gulp.parallel(nunjucks, styles, scripts, browsersync, watching);