var gulp = require('gulp');
var sass = require('gulp-sass');

var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');

gulp.task('sass', function() {
    gulp.src('./src/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public'));
});

gulp.task('jsx', function() {
    browserify('./src/jsx/App.jsx', {
            debug: true
        })
        .transform(babelify)
        .bundle()
        .on("error", function(err) {
            console.log("Error : " + err.message);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
    gulp.watch('./src/css/main.scss', ['sass']);
    gulp.watch('./src/jsx/App.jsx', ['jsx']);
});

gulp.task('default', ['watch', 'sass', 'jsx']);
