define(function (require) {
    var assert = require('chai').assert;
    var $ = require('jquery');
    var gitbook = require('gitbook');
    require('src/plugin');
    describe("replace", function () {
        beforeEach(function () {
            $('body').append('<div class="book-body"></div>')
        });
        afterEach(function () {
            $('.book-body').remove();
        });
        it('replace on script with params and dark theme', function () {
            $('.book-body').append('<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>');
            gitbook.fire('start', {
                jsfiddle: {
                    type: 'script',
                    theme: "dark",
                    bodyColor: "red",
                    accentColor: "red",
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div> <script async="" src="http://jsfiddle.net/zalun/NmudS/embed/js/dark/?bodyColor=red&amp;accentColor=red"></script> </div>'
            );
        });
        it('replace on script without colors params and dark theme', function () {
            $('.book-body').append('<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>');
            gitbook.fire('start', {
                jsfiddle: {
                    type: 'script',
                    theme: "dark",
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div> <script async="" src="http://jsfiddle.net/zalun/NmudS/embed/js/dark/"></script> </div>'
            );
        });
        it('replace on script with params and without theme', function () {
            $('.book-body').append('<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>');
            gitbook.fire('start', {
                jsfiddle: {
                    type: 'script',
                    bodyColor: "red",
                    accentColor: "red",
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div> <script async="" src="http://jsfiddle.net/zalun/NmudS/embed/js/light/?bodyColor=red&amp;accentColor=red"></script> </div>'
            );
        });
        it('replace on frame with params and dark theme', function () {
            $('.book-body').append('<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>');
            gitbook.fire('start', {
                jsfiddle: {
                    type: 'frame',
                    theme: "dark",
                    bodyColor: "red",
                    accentColor: "red",
                    tabs: ['js', 'result']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div> <iframe src="http://jsfiddle.net/zalun/NmudS/embedded/js,result/dark/?bodyColor=red&amp;accentColor=red" allowfullscreen="allowfullscreen" frameborder="0" height="300" width="100%"></iframe> </div>'
            );
        });
        it('support inline config', function () {
            $('.book-body').append('<div><a href="https://jsfiddle.net/09bv780j/#tabs=result,css&width=500px&type=script&theme=dark&bodyColor=blue"></a></div>');
            gitbook.fire('start', {
                jsfiddle: {
                    bodyColor: 'red',
                    type: 'frame',
                    accentColor: 'red',
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div><script async="" src="https://jsfiddle.net/09bv780j/embed/result,css/dark/?bodyColor=blue&amp;accentColor=red"></script></div>'
            );
        });
        it('work on change event', function () {
            $('.book-body').append('<div><a href="https://jsfiddle.net/09bv780j/#tabs=result,css&width=500px&type=script&theme=dark&bodyColor=blue"></a></div>');
            gitbook.fire('start', {
                jsfiddle: {
                    bodyColor: 'red',
                    type: 'frame',
                    accentColor: 'red',
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div><script async="" src="https://jsfiddle.net/09bv780j/embed/result,css/dark/?bodyColor=blue&amp;accentColor=red"></script></div>'
            );

            $('.book-body').html('<div> <a href="//jsfiddle.net/zalun/NmudS/">Yellow</a> </div>');
            gitbook.fire('page.change', {
                jsfiddle: {
                    bodyColor: 'red',
                    type: 'frame',
                    accentColor: 'red',
                    tabs: ['js']
                }
            });
            assert.equal(
                $('.book-body').html(),
                '<div> <iframe src="http://jsfiddle.net/zalun/NmudS/embedded/js/light/?bodyColor=red&amp;accentColor=red" allowfullscreen="allowfullscreen" frameborder="0" height="300" width="100%"></iframe> </div>'
            );
        });
    });

});