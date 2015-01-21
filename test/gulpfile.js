var gulp = require('gulp'),
    documentWrite = require('../index');

gulp.task('default', function() {
    gulp.src('./web/**/*.js')
        .pipe(documentWrite({
            context: './web', // Specify webroot if document.write absolute path. Default: process.cwd()
            relativeTo: './web' // Specify relative to which path. Default: the file.path
        }))
        .pipe(gulp.dest('./build'));
});