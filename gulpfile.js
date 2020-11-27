const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-minify');
const minifyHtml = require('gulp-htmlmin');

gulp.task('minify-css', () => {
    return gulp.src('./app/styles/*.css')
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/styles'))
});

gulp.task('minify-html', () => {
    return gulp.src('./app/**/*.html')
        .pipe(minifyHtml({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('minify-js', () => {
    return gulp.src('./app/scripts/*.js')
        .pipe(minifyJs({
            noSource: true,
            ext: {
                min: '.js'
            }
        }))
        .pipe(gulp.dest('./build/scripts'))
})

gulp.task('copy-assets', () => {
    return gulp.src('./app/assets')
        .pipe(gulp.dest('./build/assets'))
})

gulp.task('copy-dados', () => {
    return gulp.src('./app/dados.json')
        .pipe(gulp.dest('./build'))
})

gulp.task('build', gulp.series('minify-html', 'minify-css', 'minify-js', 'copy-assets', 'copy-dados'));