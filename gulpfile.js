let gulp = require('gulp'),
	scss = require('gulp-sass'),
	minifyJS = require('gulp-terser'),
	autoPrefixer = require('gulp-autoprefixer'),
	bs = require('browser-sync'),
	rename = require('gulp-rename'),
	delFiles = require('del'),
	cssMinify = require('gulp-csso'),
	htmlMinify = require('gulp-htmlmin'),
	includer = require("gulp-x-includer"),
	babel = require('gulp-babel');

gulp.task('html', () => {
	return gulp.src('app/html/index.html')
		.pipe(htmlMinify({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('scss', () => {
	return gulp.src('app/scss/**/*.scss')
		.pipe(scss())
		.pipe(autoPrefixer())
		.pipe(cssMinify())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('img_to_dist', () => {
	return gulp.src('app/img/**/*.+(jpg|jpeg|png)')
		.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts_to_dist', () => {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', () => {
	return delFiles('dist');
});

gulp.task('js:plagins', () => {
	return gulp.src('app/js/plagins/*.js')
		.pipe(gulp.dest('dist/js/plagins'))
});

gulp.task('js:es6', () => {
	return gulp.src('app/js/main.js')
		.pipe(includer())
		.pipe(minifyJS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'))
});

gulp.task('js:babel', () => {
	return gulp.src('app/js/main.js')
		.pipe(includer())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(minifyJS())
		.pipe(rename({
			suffix: '.es5.min'
		}))
		.pipe(gulp.dest('dist/js'))
});

gulp.task('server', () => {
	return bs({
		server: {
			baseDir: 'dist'
		}
	})
});

gulp.task('watch', () => {
	return gulp.watch(['app/scss/**/*.scss', 'app/js/**/*.js', 'app/html/index.html'], gulp.series(
		'scss','js:es6', 'js:babel', 'html', (done) => {
		bs.reload();
		done();
	}))
});

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('scss', 'html', 'js:plagins', 'js:es6', 'js:babel', 'img_to_dist', 'fonts_to_dist'),
	gulp.parallel('watch', 'server')
));

