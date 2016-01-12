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
          <iframe width="100%" height="300px" src="//jsfiddle.net/zalun/NmudS/embedded/js,result/dark/?bodyColor=red&accentColor=red" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
        </div>`.replace(/\s+/g, ' ')
        , 'replace on frame with params and dark theme');
    assert.equal(
        replace(
            '<div><a href="https://jsfiddle.net/09bv780j/#tabs=result,css&width=500px&type=script&theme=dark&bodyColor=blue"></a></div>',
            {
                bodyColor:'red',
                type:'frame',
                accentColor: 'red',
                tabs:['js']
            }
        ),
        '<div><script async src="https://jsfiddle.net/09bv780j/embed/result,css/dark/?bodyColor=blue&accentColor=red"></script></div>',
        'support inline config'
    );
    assert.end();
});