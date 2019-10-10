// =============================================================================

  // Clone
  // Authored by Josh Beveridge

  // "gulp"
  // "gulp build"

// =============================================================================

"use strict";

// URL Subdirectory ============================================================
// This variable is designed to allow for proper relative links when publishing to a subdirectory or Github Pages. If you plan on publishing to Github Pages, set this variable to the name of your repository.

let urlPrefix = "";

// If this variable is used, it's important to leverage the $ROOT variable in your Twig files to ensure your assets and application links work properly when deployed.

// $ROOT = /subdirectory..
// e.g. <link async href="$ROOT/css/app.css" rel="stylesheet"> turns into <link async href="/subdirectory/css/app.css" rel="stylesheet">
// href="$ROOT/img/image.jpg" turns into href="/subdirectory/img/image.jpg"

// Requirements ================================================================
const gulp = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const replace = require('gulp-replace');
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
                baseDir: "cache"
            },
        });
        done();
    };

    // BrowserSync Reload
    function browserSyncReload(done) {
        return src('cache/*.html')
        .pipe(browsersync.reload({
            stream: true
        }));
    }

    // Twig
    function template() {
        return src('app/twig/**/index.twig')
        .pipe(twig())
        .pipe(dest('cache'));
    }
    function replacePath() {
        return src('cache/**/*.html')
        .pipe(replace('$ROOT', ""))
        .pipe(dest('cache'));
    }
    let rootPath = "/" + urlPrefix;
    function replaceDocsPath() {
        if (urlPrefix == "") {
            return src('cache/**/*.html')
            .pipe(replace('$ROOT', ""))
            .pipe(dest('cache'));
        } else {
            return src('cache/**/*.html')
            .pipe(replace('$ROOT', rootPath))
            .pipe(dest('cache'));
        }
    }

    // Clone JS
    function moveCloneJS() {
        return src('node_modules/clone-framework/dist/js/clone.min.js')
        .pipe(dest('cache/js/clone'));
    }

    // JavaScript
    function js() {
        return src('app/js/**/*.js')
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
    function favicons() {
        return src('app/favicons/*')
        .pipe(dest('cache'));
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
        return src('cache/js/**/*.js')
        .pipe(uglify())
        .pipe(dest('docs/js'));
    }
    function docsCacheCSS() {
        return src('cache/css/**/*.css')
        .pipe(postcss([cssnano()]))
        .pipe(dest('docs/css'));
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
    const compile = series(cleanCache, template, replacePath, moveCloneJS, js, cacheImages, compileCSS, favicons);

    // Docs
    const docsCompile = series(cleanCache, template, replaceDocsPath, moveCloneJS, js, cacheImages, compileCSS);
    const docs = series(docsCacheHTML, docsCacheJS, docsCacheCSS, moveImages, docsFavicons);

    // Watch
    function watchFiles() {
        watch('app/scss/**/*.scss', series(compile, browserSyncReload));
        watch('app/twig/**/*.twig', series(compile, browserSyncReload));
        watch('app/js/**/*.js', series(compile, browserSyncReload));
        watch('app/img/**/*.js', series(compile, browserSyncReload));
    }

    // Export
    exports.build = series(cleanDocs, docsCompile, docs);
    exports.watch = series(compile, parallel(browserSync, watchFiles));
    exports.default = series(compile, parallel(browserSync, watchFiles));