/// <reference path="./typings/tsd.d.ts"/>

import * as fs from 'fs';
import * as path from 'path';
import * as JSON5 from 'json5';
import * as yaml from 'js-yaml';

// these go first
class JSParser implements Parser {
    public parse(file: string): Object {
        return require(file);
    }
}

class JSONParser implements Parser {
    public parse(file: string): Object {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
}

class JSON5Parser implements Parser {
    public parse(file: string): Object {
        return JSON5.parse(fs.readFileSync(file, 'utf8'));
    }
}

class YAMLParser implements Parser {
    public parse(file: string): Object {
        return yaml.load(fs.readFileSync(file, 'utf8'));
    }
}

class Config<D> {

    public static parsers: {[key: string]: Parser} = {
        js: new JSParser(),
        json: new JSONParser(),
        json5: new JSON5Parser(),
        yaml: new YAMLParser(),
        yml: new YAMLParser()
    };
    private defaultFile: string;
    private specificFile: string;
    private parser: Parser;

    constructor(private folder: string, extension: string = 'json') {
        this.parser = Config.parsers[extension];
        if (!this.parser) {
            throw new Error('Could not find parser for ' + extension + '! Valid extensions: ' + Object.keys(Config.parsers).join(', '));
        }
        this.defaultFile = path.join(folder, 'default.' + extension);
        this.specificFile = path.join(folder, (process.env.NODE_ENV || 'development') + '.' + extension);
    }

    public data(): D {
        let data:any = {};
        if (fs.existsSync(this.defaultFile)) {
            let newData: any = this.parser.parse(this.defaultFile);
            Config.merge(data, newData);
        }
        if (fs.existsSync(this.specificFile)) {
            let newData: any = this.parser.parse(this.specificFile);
            Config.merge(data, newData);
        }
        return data;
    }

    private static merge(o1: Object, o2: Object) {
        for (let property in o2) {
            if (o2.hasOwnProperty(property)) {
                o1[property] = o2[property];
            }
        }
    }
}
export default Config; // typescript hack, because we override it later anyways
module.exports = Config;
// this will allow us in ES6 and TypeScript to import this as the default class.
// however we need the hack above, because otherwise typescript doesn't believe us
module.exports.default = module.exports;
Object.defineProperty(exports, "__esModule", {value: true});

export interface Parser {
    parse(file: string): Object;
}
