requirejs 解决文本打包
使用方法
    安装npm -g install gulp-requirejs-optimize-text

    parameter file:[{defineName:'',path:''},...]


    var gulp = require('gulp');
    var requirejsOptimize = require('gulp-requirejs-optimize');
    var rename = require('gulp-rename');
    var optimizeText = require('gulp-requirejs-optimize-text');

    gulp.task('test', function () {
        return gulp.src('init.js')
            .pipe(requirejsOptimize({
                paths: {
                    underscore: "lib/underscore-1.5.2.min",
                    text: "../../scripts/bower_components/text/text"
                },
                shim: {
                    underscore: {
                        exports: "_"
                    }
                }
            }))
            .pipe(optimizeText(
            {files:
                [{defineName:'text!main.html',path:'main.html'},
                {defineName:'text!test/main.html',path:'test/main.html'}]
            }))
            .pipe(rename("test.js"))
            .pipe(gulp.dest('app'))
    });
结果:
    define(['text!main.html'],function(){});define(['text!test/main.html'],function(){});


