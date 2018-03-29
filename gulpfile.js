//gulpfile.js
var gulp = require("gulp");
var postcss = require("gulp-postcss");

var precss = require("precss");
var cssnano = require('cssnano');
var rename = require('gulp-rename');

gulp.task('default', function () {
    var processors = [
        precss,
        require("postcss-cssnext")({
            browsers: ['last 20 versions', 'Android >= 4.0', 'safari >= 9', 'ie >= 8'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }),
        require("cssgrace")
    ];
    var nanoprocessor = [cssnano()];

    return gulp.src("./src/stylesheets/mquery.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest("./public/stylesheets"))
        .pipe(postcss(nanoprocessor))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./public/stylesheets"));
});