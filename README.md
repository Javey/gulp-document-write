# gulp-document-write

Merge script files by document.write use gulp.

# Features

1. Support javascript comment.
2. Support nested document.write. Process recursively.

# Usage

see example [gulpfile](https://github.com/Javey/gulp-document-write/blob/master/test/gulpfile.js)

```javascript
var gulp = require('gulp'),
    documentWrite = require('gulp-document-write');

gulp.task('default', function() {
    gulp.src('./web/**/*.js')
        .pipe(documentWrite({
            context: './web', // Specify webroot if document.write absolute path. Default: process.cwd()
            relativeTo: './web' // Specify relative to which path. Default: the file.path
        }))
        .pipe(gulp.dest('./build'));
});
```