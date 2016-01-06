/*require(["gitbook", "jquery"], function (gitbook, $) {
 var matcher;
 var localConfig = {jsfiddle:{}};

 function getQuery(querystring) {
 var query = {};

 var pairs = querystring.split('&'),
 length = pairs.length,
 keyval = [],
 i = 0;

 for (; i < length; i++) {
 keyval = pairs[i].split('=', 2);
 try {
 keyval[0] = decodeURIComponent(keyval[0]); // key
 keyval[1] = decodeURIComponent(keyval[1]); // value
 } catch (e) {
 }

 if (query[keyval[0]] === undefined) {
 query[keyval[0]] = keyval[1];
 } else {
 query[keyval[0]] += ',' + keyval[1];
 }
 }

 return query;
 }

 // <iframe width="100%" height="300" src="http://jsfiddle.net/taucharts/hmvwg1mn/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
 function embed(link, config) {
 var iframe = document.createElement('iframe'),
 url = link.href.replace(/\?.+/, '') + 'embedded/' + config.tabs.join(',') + '/';

 iframe.src = url;
 var $frame = $(iframe);
 $frame.attr('allowfullscreen', 'allowfullscreen');
 $frame.attr('frameborder', 0);
 iframe._src = url; // support for google slide embed
 iframe.className = link.className; // inherit all the classes from the link
 iframe.id = link.id; // also inherit, giving more style control to the user
 iframe.style.border = '1px solid #aaa';

 var query = getQuery(link.search);
 var widht = query.width || config.width || '100%';
 var height = query.height || config.height || '100%';
 $frame.attr('width', widht);
 $frame.attr('height', height);
 link.parentNode.replaceChild(iframe, link);

 var onmessage = function (event) {
 event || (event = window.event);
 // * 1 to coerse to number, and + 2 to compensate for border
 iframe.style.height = (event.data.height * 1 + 2) + 'px';
 };

 if (window.addEventListener) {
 window.addEventListener('message', onmessage, false);
 } else {
 window.attachEvent('onmessage', onmessage);
 }
 }

 function embedAllLink(config) {
 localConfig.jsfiddle = config.jsfiddle || {};
 localConfig.tabs = config.tabs || ['result'];
 $(".book-body a").each(function (index, link) {
 if (link.href && matcher.test(link.href)) {
 embed(link, localConfig.jsfiddle);
 }
 });
 }

 gitbook.events.bind("start", function (e, config) {
 matcher = /(http|https):\/\/jsfiddle.net\/.+/;
 embedAllLink(config);
 });

 gitbook.events.bind("page.change", function () {
 if (matcher) {
 embedAllLink(localConfig);
 }
 });
 });*/
var htmlparser = require('htmlparser2');
var DomHandler = require('domhandler');
var domutils = require('domutils');
var matcher = /\/\/jsfiddle.net\/.+/;

createScriptNode = function (href, config) {
    var contentDOM = [];
    var handler = new DomHandler(function (error, dom) {
        if (error)
            console.log(error);
        else
            contentDOM = dom;
    });
    var parser = new htmlparser.Parser(handler);
    var tabs = ["result","js","css", "html"];
    parser.write('<script async src="' + href + 'embed/' + tabs.join(',') + '/dark/" ></script>');
    parser.done();
    return contentDOM[0];
};

module.exports = function (rawHtml, config) {
    var contentDOM = [];
    var handler = new DomHandler(function (error, dom) {
        if (error)
            console.log(error);
        else
            contentDOM = dom;
    });
    var parser = new htmlparser.Parser(handler);
    parser.write(rawHtml);
    parser.done();
    var links = domutils.find(function (element) {
        return element.attribs && element.attribs.href && matcher.test(element.attribs.href);
    }, contentDOM, true);
    links.forEach(function (link) {
        domutils.replaceElement(link, createScriptNode(link.attribs.href))
    });
    return domutils.getOuterHTML(contentDOM);
};
