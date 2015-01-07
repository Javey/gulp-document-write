var gulp = require('gulp'),
    documentWrite = require('../index');

gulp.task('default', function() {
    gulp.src('./web/**/*.js')
        .pipe(documentWrite())
        .pipe(gulp.dest('./build'));
});