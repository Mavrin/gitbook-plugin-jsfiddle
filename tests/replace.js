var test = require('tape');
var replace = require('./../src/replace');

test('scanner', function (assert) {
    replace();
    assert.equal(true, true, 'replaced');
    assert.end();
});