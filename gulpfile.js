var gulp = require("gulp"),
	gulpLoadPlugins = require('gulp-load-plugins'),
    del = require("del"),
    Browsersync = require('browser-sync').create(),
    reload = Browsersync.reload;
const $ =  gulpLoadPlugins();
gulp.task("less", function() {
	return gulp.src("./static_resource/less/*.less")
			   .pipe($.less())
			   .pipe($.autoprefixer())
			   .pipe($.minifyCss())
			   .pipe(gulp.dest("./static_resource/css"))
			   .pipe(reload({stream: true}));;
})
gulp.task("js", function() {
	return gulp.src("./static_resource/js/*.js")
			   .pipe($.jshint(".jshintrc"))
			   .pipe($.jshint.reporter('default'))
			   .pipe($.uglify())
			   .pipe(gulp.dest("./js"));
})
gulp.task("clean", function() {
	//del(['./styles/**/*.css']);
})
gulp.task('serve', ['less', 'js'], function() {
    Browsersync.init({
        proxy: "http://127.0.0.1:80"
    });
    gulp.watch("./static_resource/less/*.less", ['less']);
    gulp.watch("./application/views/**/*.jade").on('change', reload);
});