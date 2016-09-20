var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');

gulp.task("styles", function () {
    gulp.src(["./src/app/styles/styles.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./wwwroot/styles"))
});

gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('wwwroot/js'))
});

gulp.task('useref', function () {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('wwwroot'))
});

gulp.task('template', function () {
    return gulp.src('src/app/**/*.html')
        .pipe(templateCache('templates.js', { module: 'templates', standalone: true }))
        .pipe(gulp.dest('wwwroot/js'));
});

// gulp.task('pages', function () {
//     return gulp.src('src/app/**/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('wwwroot/pages'))
// });

gulp.task('watch', ['styles', 'scripts'], function () {
    // Watch .scss files
    gulp.watch('src/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'useref', 'template']);