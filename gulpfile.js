var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "app/"
    });
    gulp.watch("src/styles/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("src/styles/*.scss")
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("app/assets/css/"))
    .pipe(browserSync.stream());
});
gulp.task('fileinclude', function() {
    gulp.src("src/pages/main/index.html")
    .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
    }))
    .pipe(gulp.dest("app/"));
})