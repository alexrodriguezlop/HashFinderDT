
var gulp = require('gulp');
const { series } = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', done => {
    gulp
        .src('./test/test.js')
        .pipe(mocha())
        .on('error', function () {
            this.emit('end');   
        })
        ;done();
});