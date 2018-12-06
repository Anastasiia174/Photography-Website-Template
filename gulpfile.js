var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "app/"
    });
    gulp.watch("src/{blocks,pages,styles}/**/*.scss", ['sass']);
    gulp.watch("src/{blocks,pages}/**/*.html", ['fileinclude']);
    gulp.watch("src/scripts/scripts.js", ['minjs']);
});

gulp.task('sass', function() {
    return gulp.src("src/styles/*.scss")
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("app/assets/css/"))
    .pipe(browserSync.stream());
});
gulp.task('minjs', function() {
    return gulp.src("src/scripts/scripts.js")
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest("app/assets/scripts/"))
    .pipe(browserSync.stream());
});
gulp.task('fileinclude', function() {
    gulp.src("src/pages/index.html")
    .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
    }))
    .pipe(gulp.dest("app/"))
    .pipe(browserSync.stream());
})