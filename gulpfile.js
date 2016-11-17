var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var cssnano = require('gulp-cssnano');
var inject = require('gulp-inject');
var jshint = require("gulp-jshint");
var open = require('gulp-open');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var karmaserver = require('karma').Server;

//==============================================================================
// Tasks
//==============================================================================
gulp.task("default", ["debug"]);
gulp.task("debug", ["demo", "watch", "serve"]);

gulp.task("connect", function () {
    var app = connect.server({
        root: ["./wwwroot/"],
        port: 8888,
        livereload: true
    });
});

gulp.task("serve", ["connect"], function () {
    var options = {
        uri: "http://localhost:8888",
        app: "chrome"
    };
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task("watch", function () {
    gulp.watch(["./src/**/*.scss"], ["compile:sass"]);
    gulp.watch(["./src/**/*.html"], ["compile:html"]);
    gulp.watch(["./src/**/*.js"], ["compile:js"]);
});

//==============================================================================
// Compile Tasks
//==============================================================================
gulp.task("compile", ["compile:sass", "compile:html", "compile:js"]);

gulp.task("compile:sass", function () {
    return gulp.src([
        "./src/app/styles/styles.scss"
    ])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass().on("error", sass.logError))
        .pipe(rename("demo.app.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./wwwroot/dist"))
        .pipe(connect.reload());
});

gulp.task("compile:html", function () {
    return gulp.src([
        "./src/app/**/*.html"
    ])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(templateCache("demo.app.templates.js", {
            module: "demo.app.templates",
            standalone: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./wwwroot/dist"))
        .pipe(connect.reload());
});

gulp.task("compile:js", function () {
    return gulp.src([
        "./src/**/*.js"
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat("demo.app.js"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./wwwroot/dist"))
        .pipe(connect.reload());
});

gulp.task("copy:icons", function () {
    return gulp.src([
        "./bower_components/bootstrap-sass/assets/fonts/**"
    ])
        .pipe(gulp.dest("./wwwroot/dist/fonts"));
});

//==============================================================================
// Demo Tasks
//==============================================================================
gulp.task("demo", ["compile"], function () {
    return gulp.src("./src/index.html")
        .pipe(inject(
            gulp.src([
                "./bower_components/bootstrap/dist/css/bootstrap.min.css",
                "./bower_components/mdi/css/materialdesignicons.min.css",
                "./bower_components/prism/themes/prism-coy.css",
                "./bower_components/angular/angular.min.js",
                "./bower_components/angular-route/angular-route.min.js",
                "./bower_components/abdmob/x2js/xml2json.js",
                "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
                "./bower_components/prism/prism.js",
                "./bower_components/ace-builds/src-min-noconflict/ace.js",
                "./bower_components/angular-ui-ace/ui-ace.js"
            ], { read: false }), {
                name: 'vendor'
            }))
        .pipe(inject(
            gulp.src([
                "./dist/demo.app.css",
                "./dist/demo.app.js",
                "./dist/demo.app.templates.js"
            ], { read: false }), {
                name: 'dist'
            }))
        .pipe(gulp.dest('./wwwroot/'));
});

//==============================================================================
// Test
//==============================================================================

gulp.task('test', function (done) {
    new karmaserver({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, function (exitCode) {
        done();
        process.exit(exitCode);
    }).start();
});