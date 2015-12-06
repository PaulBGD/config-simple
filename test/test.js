"use strict";
var assert = require('assert');
var path = require('path');
var index_1 = require('../index');
describe('Config', function () {
    describe('#new()', function () {
        it('should load the default.json when in dev env', function () {
            process.env.NODE_ENV = 'development';
            var config = new index_1.default(path.join(__dirname, './config'));
            assert.strictEqual(config.data().test, 1);
            assert.strictEqual(config.data().override, false);
        });
        it('should load the production.json when in production env', function () {
            process.env.NODE_ENV = 'production';
            var config = new index_1.default(path.join(__dirname, './config'));
            assert.strictEqual(config.data().test, 1);
            assert.strictEqual(config.data().override, true);
        });
    });
});
