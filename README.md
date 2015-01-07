# gulp-document-write

Merge script files by document.write use gulp.

# Usage

see example [gulpfile](https://github.com/Javey/gulp-document-write/blob/master/test/gulpfile.js)

```javascript
var gulp = require('gulp'),
    documentWrite = require('gulp-document-write');

gulp.task('default', function() {
    gulp.src('./web/**/*.js')
        .pipe(documentWrite({
            context: './web' // specify webroot if document.write absolute path
        }))
        .pipe(gulp.dest('./build'));
});
```