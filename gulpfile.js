// =============================================================================

  // Clone
  // Authored by Josh Beveridge

  // "gulp"
  // "gulp build"

// =============================================================================

"use strict";

// Requirements ================================================================
const gulp = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const twig = require('gulp-twig');

// Tasks =======================================================================

    // Browser Sync
    function browserSync(done) {
        browsersync.init({
            server: {
                baseDir: 'cache'
            },
        });
        done();
    }

    // BrowserSync Reload
    function browserSyncReload(done) {
        return src('cache/*.html')
        .pipe(browsersync.reload({
            stream: true
        }));
    }

    // Twig
    function template() {
        return src('app/twig/*.twig')
        .pipe(twig())
        .pipe(dest('cache'));
    }

    // Clone JS
    function moveCloneJS() {
        return src('node_modules/clone-framework/app/js/clone.js')
        .pipe(dest('cache/js/clone'));
    }

    // JavaScript
    function js() {
        return src('app/js/*.js')
        .pipe(concat('app.js'))
        .pipe(dest('cache/js'));
    }

    // Sass
    function compileCSS() {
        return src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('cache/css'));
    }

    // Images
    function cacheImages() {
        return src('app/img/**/*')
        .pipe(dest('cache/img'));
    }

    function moveImages() {
        return src('cache/img/**/*')
        .pipe(dest('dist/img'));
    }

    // Minification
    function distCacheHTML() {
        return src('cache/**/*.html')
        .pipe(dest('dist'));
    }
    function distCacheJS() {
        return src('cache/js/*.js')
        .pipe(uglify())
        .pipe(dest('dist/js'));
    }
    function distCacheCSS() {
        return src('cache/css/*.css')
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist/css'));
    }
    function distCloneJS() {
        return src('cache/js/clone/*.js')
        .pipe(dest('dist/js/clone'));
    }
    function distFavicons() {
        return src('app/favicons/*')
        .pipe(dest('dist'));
    }

    // Cache Removal
    function cleanCache() {
        return del('cache/**/*')
    }

    // Docs Removal
    function cleanDist() {
        return del(['dist/**/*', '!dist/CNAME']);
    }

    // Compile
    const compile = series(cleanCache, template, moveCloneJS, js, cacheImages, compileCSS);

    // Dist
    const dist = series(distCacheHTML, distCacheJS, distCacheCSS, distCloneJS, moveImages, distFavicons);

    // Watch
    function watchFiles() {
        watch('app/scss/**/*.scss', series(compile, browserSyncReload));
        watch('app/twig/**/*.twig', series(compile, browserSyncReload));
        watch('app/js/*.js', series(compile, browserSyncReload));
    }

    // Export
    exports.build = series(cleanDist, compile, dist);
    exports.watch = series(compile, parallel(browserSync, watchFiles));
    exports.default = series(compile, parallel(browserSync, watchFiles));