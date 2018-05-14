//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    less = require('gulp-less'),			
    browserSync = require('browser-sync'), 	// 保存自动刷新

    cssnano = require('gulp-cssnano'), 		// CSS 压缩
    rename = require('gulp-rename'), 		// 重命名，其实在这个demo里没有用到
    concat = require('gulp-concat'), 		// 合并文件

    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),		// 相当于 console.log()
    plumber = require('gulp-plumber');
 
 //定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/*.less')															//该任务针对的文件
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	//该任务调用的模块
        .pipe(less())																	//该任务调用的模块
        .pipe(gulp.dest('src/css')) 													//将会在src/css下生成index.css
        .pipe(concat('index.min.css'))													//合并
	    .pipe(cssnano())																//压缩
	    .pipe(gulp.dest('dist'));														//输出
});

gulp.task('testWatch', function () {
	browserSync.init({
	    server: {
	      	baseDir: 'dist' 				// 在 dist 目录下启动本地服务器环境，自动启动默认浏览器
	    }
  	});

    gulp.watch('src/less/*.less', ['testLess']);
    gulp.watch(['dist/*']).on('change', browserSync.reload);
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径