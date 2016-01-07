var test = require('tape');
var replace = require('./../src/replace');
/*
<script
async
src="//jsfiddle.net/zalun/NmudS/embed/?fontColor=red&bodyColor=red&accentColor=red&menuColor=red"
    ></script>*/
test('scanner', function (assert) {
    var str = '<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>';

    assert.equal(
        replace(str, {
            type:'frame',
            theme:"dark",
            bodyColor:"red",
            tabs:['js']
        }),
        `<div>
          <script async src="//jsfiddle.net/zalun/NmudS/embed/js,css,html,result/dark/"></script>
        </div>`.replace(/\s+/g,' ')
        , 'replaced');
    assert.end();
});