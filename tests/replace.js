var test = require('tape');
var replace = require('./../src/replace');

test('scanner', function (assert) {
    var str = '<div><a href="//jsfiddle.net/zalun/NmudS/">Yellow</div>';

    assert.equal(replace(str), '<div><script async src="//jsfiddle.net/zalun/NmudS/embed/result,js,html,css/dark/"></script></div>', 'replaced');
    assert.end();
});