var   path    = require('path'),
      gulp    = require('gulp'),
      gutil   = require('gulp-util'),
      uglify  = require('gulp-uglify'),
      rename  = require("gulp-rename"),
      replace = require('gulp-string-replace'),
      jslint  = require('gulp-jslint'),
      pump    = require('pump');

gulp.task('compress', function (cb) {
  pump([
        gulp.src(path.resolve(__dirname, './') + '/src/*.js'),
        /*
        jslint(),
        jslint.reporter('default'),*/
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest(path.resolve(__dirname, './') + '/dist/')
    ],
    cb
  );
});

gulp.task('update-readme', function (cb) {
  gutil.log('The NEW version: ' + gutil.env.version);
  gutil.log('The NEW build number: ' + gutil.env.travisbuild);
  pump([
        gulp.src(path.resolve(__dirname, './') + '/README.md'),
        replace(new RegExp('https:\/\/d2m9ia44cpx81c\.cloudfront\.net\/js\/services\/(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)\/services\.library\.min\.js', 'g'), 'https://d2m9ia44cpx81c.cloudfront.net/js/services/' + gutil.env.version + '/services.library.min.js'),
        replace(new RegExp('https:\/\/d2m9ia44cpx81c\.cloudfront\.net\/js\/services\/(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)\/services\.aws-sdk\.min\.js', 'g'), 'https://d2m9ia44cpx81c.cloudfront.net/js/services/' + gutil.env.version + '/services.aws-sdk.min.js'),
        replace(new RegExp('build number: (?:\\d*)', 'g'), 'build number: ' + gutil.env.travisbuild),
        gulp.dest(path.resolve(__dirname, './'))
    ],
    cb
  );
});

