//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    less = require('gulp-less'),            
    //browserSync = require('browser-sync'),  // 保存自动刷新

    babel = require("gulp-babel");          // babel处理js
    cssnano = require('gulp-cssnano'),      // CSS 压缩
    rename = require('gulp-rename'),        // 重命名
    concat = require('gulp-concat'),        // 合并文件
    cached = require('gulp-cached'),        // 缓存当前任务中的文件，只让已修改的文件通过管道

    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),        // 相当于 console.log()
    plumber = require('gulp-plumber');
 
 //定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/special/*.less')                                                 //该任务针对的文件
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //编译错误处理
        .pipe(less())                                                                   //编译less
        .pipe(gulp.dest('src/css'))                                                     //输出
        .pipe(cssnano())                                                                //压缩
        .pipe(gulp.dest('dist/css'));                                                   //输出
});

gulp.task('testBabel',function(){
    gulp.src('src/js/*.js')                 //针对文件
        .pipe(cached('script'))             //缓存文件
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //编译错误处理
        .pipe(babel({                       //将js转为es5写法
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/js"));        //输出
});

gulp.task('testWatch', function () {
    // browserSync.init({
    //     server: {
    //         baseDir: 'dist'                 // 在 dist 目录下启动本地服务器环境，自动启动默认浏览器
    //     }
    // });

    gulp.watch('src/js/*.js',['testBabel']);
    gulp.watch('src/less/*/*.less', ['testLess']);
    //gulp.watch(['dist/*']).on('change', browserSync.reload);
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径