var test = require('tape');
var replace = require('./../src/replace');

test('scanner', function (assert) {
    var str = '<div><a href="//jsfiddle.net/zalun/NmudS/">Yellow</a></div>';

    assert.equal(replace(str), '<div><script async src="//jsfiddle.net/zalun/NmudS/embed/js,css,html,result/dark/"></script></div>', 'replaced');
    assert.end();
});