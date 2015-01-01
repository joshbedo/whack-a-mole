var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify   = require('watchify');
var remapify   = require('remapify');
var source     = require('vinyl-source-stream');
var path       = require('path');
var merge      = require('merge-stream');
var buffer     = require('vinyl-buffer');
var _          = require('lodash');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Probably don't need `plumber` anymore since onError was fixed in Gulp recently
gulp.task('clean', function() {
	return gulp.src('app/tmp', {read: false})
	  .pipe($.plumber())
	  .pipe($.clean());
});

gulp.task('html', function() {
	return gulp.src('./src/index.html')
	  .pipe($.plumber())
	  .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
	return gulp.src('./src/main.scss')
	  .pipe($.sass())
	  .pipe($.autoprefixer())
	  .pipe($.rename('bundle.css'))
	  .pipe(gulp.dest('./dist'))
	  .pipe(reload({ stream: true }));
});

var bundler;
function getBundler() {
	if (!bundler) {
		bundler = watchify(browserify('./src/main.js', _.extend({ debug: true }, watchify.args)));

		bundler.plugin(remapify, [{
			src: '**/*.js',
			expose: 'src',
			cwd: path.join(__dirname, 'src')
		}]);
	}
	return bundler;
}

function bundle() {
	return getBundler().bundle()
	  .on('error', $.util.log)
	  .pipe(source('bundle.js'))
	  .pipe(buffer())
	  .pipe($.sourcemaps.init({ loadMaps: true }))
	  .pipe($.sourcemaps.write('./'))
	  .pipe(gulp.dest('./dist'))
	  .pipe(reload({ stream: true }));
}

gulp.task('scripts', function() {
	process.env.BROWSERIFYSWAP_END = 'dist';
	return bundle();
});

gulp.task('symlink', function() {
	return gulp.src('./src')
	  .pipe($.plumber())
	  .pipe($.symlink('./node_modules'));
});

gulp.task('mocha', ['symlink'], function() {
	return gulp.src([
		'./test/setup/node.js',
		'./test/setup/helpers.js',
		'./test/unit/**/*.js'
	], { read: false })
	  .pipe($.plumber())
	  .pipe($.mocha({ reporter: 'spec' }));
});

// This is where the magic happens!
gulp.task('build', [
	'clean',
	'html',
	'styles',
	'scripts'
	// 'test'
]);

gulp.task('test', ['mocha']);

gulp.task('watch', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'dist',
		}
	});

	getBundler().on('update', function() {
		gulp.start('scripts');
		gulp.start('test');
	});
	gulp.watch('./test/**/*.js', ['test']);
	gulp.watch(['./src/main.scss', './src/**/*.scss'], ['styles']);
});

gulp.task('default', ['watch']);
