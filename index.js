var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    Path = require('path');

const PLUGIN_NAME = 'gulp-document-write';

function documentWrite(options) {
    options = options || {
        'context': '.'
    };

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported'));
            return cb();
        }

        var contents = file.contents.toString();
        // remove comment
        contents = contents.replace(/\/\/\s*document\.write.*(?=\n)/g, '').replace(/\/\*+\s*document\.write.*?\*\//g, '');

        contents = contents.replace(/document\.write\(.*?src=[\'\"]?([^\'\"]+)[\'\"]?.*?\);?/g, function(str, path) {
            // ignore http link
            if (~path.indexOf('://')) return str;

            if (path.charAt(0) === '/') {
                path = Path.join(Path.resolve(options.context), path);
            } else {
                path = Path.resolve(Path.dirname(file.path), path)
            }
            if (fs.existsSync(path)) {
                return fs.readFileSync(path);
            }

            return str;
        });

        file.contents = new Buffer(contents);

        this.push(file);
        cb();
    });
}

module.exports = documentWrite;