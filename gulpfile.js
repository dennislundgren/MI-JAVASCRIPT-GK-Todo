// Deklarera samtliga gulp-tillägg
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const auto = require("gulp-autoprefixer");

// Deklarera kompileringsfunktionen.
gulp.task("compile", function () {
  return gulp.src("scss/*.scss").pipe(sass()).pipe(gulp.dest("css"));
});

// Sekventiellt återskapar ovan funktion.
gulp.task("watch-scss", function () {
  gulp.watch("scss/*.scss", gulp.series("compile"));
});

// Med default som namn räcker det med att skriva "gulp" i terminalen för att aktivera kompileringen och återskapa den i bakgrunden.
gulp.task("default", gulp.series("compile", "watch-scss"), function () {});

// Minifierar och städar all kod.
// "npm clean" i terminalen.
gulp.task("clean", function () {
  return gulp
    .src("css/main.css")
    .pipe(auto())
    .pipe(csso())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("css"));
});
