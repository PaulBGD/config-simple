/// <reference path="../typings/tsd.d.ts"/>

import * as assert from 'assert';
import * as path from 'path';
import Config from '../index';

interface ConfigTest {
    test: number;
    override: boolean;
}

describe('Config', () => {
    describe('#new()', () => {
        it('should load the default.json when in dev env', () => {
            process.env.NODE_ENV = 'development';
            let config: Config<ConfigTest> = new Config<ConfigTest>(path.join(__dirname, './config'));
            assert.strictEqual(config.data().test, 1);
            assert.strictEqual(config.data().override, false);
        });
        it('should load the production.json when in production env', () => {
            process.env.NODE_ENV = 'production';
            let config: Config<ConfigTest> = new Config<ConfigTest>(path.join(__dirname, './config'));
            assert.strictEqual(config.data().test, 1);
            assert.strictEqual(config.data().override, true);
        });
    });
});
