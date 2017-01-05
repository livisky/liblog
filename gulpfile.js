/**
 Gulpfile for gulp-liblog
 created by livisky
*/

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    minifyHTML = require('gulp-minify-html'),
    htmlreplace = require('gulp-html-replace');

var targetUrl = 'www/static/theme/liblog/res/';

//将css拷贝到目标目录并压缩-livi
gulp.task('copy:css', function() {
    return gulp.src([targetUrl + 'src/css/**/**/*'])
        //压缩less编译后的css及目录下的css
        .pipe(cssmin())
        //拷贝到相应目录
        .pipe(gulp.dest(targetUrl + 'css'));
});

// 合并公用css文件
gulp.task('concat', ['copy:css'], function() {
    return gulp.src([targetUrl + 'css/business/index/index.css', targetUrl + 'css/business/index/layout.css'])
        .pipe(concat('default.min.css'))
        .pipe(gulp.dest(targetUrl + 'css/business/index'));
});

//将js拷贝到目标目录并压缩-livi
gulp.task('copy:js', function() {
    return gulp.src([targetUrl + 'src/js/**/**/*'])
        // /www/static/theme/liblog/res/
        .pipe(uglify())
        .pipe(gulp.dest(targetUrl + 'js'))
});

// 合并公用js文件
gulp.task('uglify', ['copy:js'], function() {
    return gulp.src([targetUrl + 'js/business/pagecommon/footer.js', targetUrl + 'js/widget/timeago/timeago.js', targetUrl + 'js/widget/timeago/timeago.zh-cn.js'])
        .pipe(concat('footer.min.js'))
        .pipe(gulp.dest(targetUrl + 'js/business/pagecommon'))
});


gulp.task('html-replace', function() {
    var opts = { comments: false, spare: false, quotes: true };
    return gulp.src('www/static/theme/liblog/modules_src/**/**/*.html')
        .pipe(htmlreplace({
            'css': '/static/theme/liblog/res/css/business/index/default.min.css',
            'js': '/static/theme/liblog/res/js/business/pagecommon/footer.min.js'
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('www/static/theme/liblog/modules'));
});

//压缩、发布
gulp.task('default', ['copy:css', 'concat', 'copy:js', 'uglify', 'html-replace']);