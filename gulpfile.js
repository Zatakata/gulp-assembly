let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  babel = require('gulp-babel'),
  concat = require('gulp-concat');

gulp.task("html", function () {
  gulp.src('app/index.html')
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("scss", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task("js", function () {
  return gulp.src('app/js/index.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("js-libs", function () {
  return gulp.src(['app/js/libs/lib1.js', 'app/js/libs/lib2.js'])
    .pipe(concat('libs.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('app/js/index.js', gulp.parallel('js'))
})

gulp.task('default', gulp.parallel('js', 'js-libs', 'scss', 'html', 'browser-sync', 'watch'))