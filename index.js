/// <reference path="./typings/tsd.d.ts"/>
var fs = require('fs');
var path = require('path');
var JSON5 = require('json5');
var yaml = require('js-yaml');
// these go first
var JSParser = (function () {
    function JSParser() {
    }
    JSParser.prototype.parse = function (file) {
        return require(file);
    };
    return JSParser;
})();
var JSONParser = (function () {
    function JSONParser() {
    }
    JSONParser.prototype.parse = function (file) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    };
    return JSONParser;
})();
var JSON5Parser = (function () {
    function JSON5Parser() {
    }
    JSON5Parser.prototype.parse = function (file) {
        return JSON5.parse(fs.readFileSync(file, 'utf8'));
    };
    return JSON5Parser;
})();
var YAMLParser = (function () {
    function YAMLParser() {
    }
    YAMLParser.prototype.parse = function (file) {
        return yaml.load(fs.readFileSync(file, 'utf8'));
    };
    return YAMLParser;
})();
var Config = (function () {
    function Config(folder, extension) {
        if (extension === void 0) { extension = 'json'; }
        this.folder = folder;
        this.parser = Config.parsers[extension];
        if (!this.parser) {
            throw new Error('Could not find parser for ' + extension + '! Valid extensions: ' + Object.keys(Config.parsers).join(', '));
        }
        this.defaultFile = path.join(folder, 'default.' + extension);
        this.specificFile = path.join(folder, (process.env.NODE_ENV || 'development') + '.' + extension);
    }
    Config.prototype.data = function () {
        var data = {};
        if (fs.existsSync(this.defaultFile)) {
            var newData = this.parser.parse(this.defaultFile);
            Config.merge(data, newData);
        }
        if (fs.existsSync(this.specificFile)) {
            var newData = this.parser.parse(this.specificFile);
            Config.merge(data, newData);
        }
        return data;
    };
    Config.merge = function (o1, o2) {
        for (var property in o2) {
            if (o2.hasOwnProperty(property)) {
                o1[property] = o2[property];
            }
        }
    };
    Config.parsers = {
        js: new JSParser(),
        json: new JSONParser(),
        json5: new JSON5Parser(),
        yaml: new YAMLParser(),
        yml: new YAMLParser()
    };
    return Config;
})();
exports.__esModule = true;
exports["default"] = Config;
module.exports = Config;
// this will allow us in ES6 and TypeScript to import this as the default class.
// however we need the hack above, because otherwise typescript doesn't believe us
module.exports.default = module.exports;
Object.defineProperty(exports, "__esModule", { value: true });
