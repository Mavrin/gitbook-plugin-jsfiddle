var test = require('tape');
var replace = require('./../src/replace');

test('replacer', function (assert) {
    var str = '<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>';

    assert.equal(
        replace(str, {
            type: 'script',
            theme: "dark",
            bodyColor: "red",
            accentColor: "red",
            tabs: ['js']
        }),
        `<div>
          <script async src="//jsfiddle.net/zalun/NmudS/embed/js/dark/?bodyColor=red&accentColor=red"></script>
        </div>`.replace(/\s+/g, ' ')
        , 'replace on script with params and dark theme');
    assert.equal(
        replace(str, {
            type: 'script',
            bodyColor: "red",
            accentColor: "red",
            tabs: ['js']
        }),
        `<div>
          <script async src="//jsfiddle.net/zalun/NmudS/embed/js/light/?bodyColor=red&accentColor=red"></script>
        </div>`.replace(/\s+/g, ' ')
        , 'replace on script with params and without theme');
    assert.equal(
        replace(str, {
            type: 'frame',
            theme: "dark",
            bodyColor: "red",
            accentColor: "red",
            tabs: ['js', 'result']
        }),
        `<div>
          <iframe width="100%" height="100%" src="//jsfiddle.net/zalun/NmudS/embedded/js,result/dark/?bodyColor=red&accentColor=red" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
        </div>`.replace(/\s+/g, ' ')
        , 'replace on frame with params and dark theme');
    assert.end();
});