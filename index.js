var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    Path = require('path');

const PLUGIN_NAME = 'gulp-document-write';

function documentWrite(options) {
    options = options || {
        'context': '.',
        'relativeTo': ''
    };

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported'));
            return cb();
        }

        var contents = replace(file.contents.toString(), options, file.path);

        file.contents = new Buffer(contents);

        this.push(file);
        cb();
    });
}

function replace(contents, options, filePath) {
    // remove comment
    contents = contents.replace(/\/\/\s*document\.write.*(?=\n)/g, '').replace(/\/\*+\s*document\.write.*?\*\//g, '');

    contents = contents.replace(/document\.write\(.*?src=[\'\"]?([^\'\"]+)[\'\"]?.*?\);?/g, function(str, path) {
        // ignore http link
        if (~path.indexOf('://')) return str;

        if (path.charAt(0) === '/') {
            path = Path.join(Path.resolve(options.context), path);
        } else {
            path = Path.resolve(options.relativeTo || Path.dirname(filePath), path)
        }
        if (fs.existsSync(path)) {
            // replace recursively
            return replace(fs.readFileSync(path, 'utf-8'), options, path);
        }

        return str;
    });

    return contents;
}

module.exports = documentWrite;