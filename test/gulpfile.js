var gulp = require('gulp'),
    documentWrite = require('../index');

gulp.task('default', function() {
    gulp.src('./web/**/*.js')
        .pipe(documentWrite({
            context: './web' // specify webroot if document.write absolute path
        }))
        .pipe(gulp.dest('./build'));
});