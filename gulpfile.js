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
        return src('node_modules/clone-framework/dist/js/clone.min.js')
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
        .pipe(dest('docs/img'));
    }

    // Minification
    function docsCacheHTML() {
        return src('cache/**/*.html')
        .pipe(dest('docs'));
    }
    function docsCacheJS() {
        return src('cache/js/*.js')
        .pipe(uglify())
        .pipe(dest('docs/js'));
    }
    function docsCacheCSS() {
        return src('cache/css/*.css')
        .pipe(postcss([cssnano()]))
        .pipe(dest('docs/css'));
    }
    function docsCloneJS() {
        return src('cache/js/clone/*.js')
        .pipe(dest('docs/js/clone'));
    }
    function docsFavicons() {
        return src('app/favicons/*')
        .pipe(dest('docs'));
    }

    // Cache Removal
    function cleanCache() {
        return del('cache/**/*')
    }

    // Docs Removal
    function cleanDocs() {
        return del(['docs/**/*', '!docs/CNAME']);
    }

    // Compile
    const compile = series(cleanCache, template, moveCloneJS, js, cacheImages, compileCSS);

    // docs
    const docs = series(docsCacheHTML, docsCacheJS, docsCacheCSS, docsCloneJS, moveImages, docsFavicons);

    // Watch
    function watchFiles() {
        watch('app/scss/**/*.scss', series(compile, browserSyncReload));
        watch('app/twig/**/*.twig', series(compile, browserSyncReload));
        watch('app/js/*.js', series(compile, browserSyncReload));
    }

    // Export
    exports.build = series(cleanDocs, compile, docs);
    exports.watch = series(compile, parallel(browserSync, watchFiles));
    exports.default = series(compile, parallel(browserSync, watchFiles));