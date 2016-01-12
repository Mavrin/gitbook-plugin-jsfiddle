var htmlparser = require('htmlparser2');
var DomHandler = require('domhandler');
var domutils = require('domutils');
var matcher = /\/\/jsfiddle.net\/.+/;
var _ = require('lodash');

var defautsConfig = {
    type: 'script',
    tabs: ['js', 'html', 'css', 'result'],
    theme: 'light'
};

var htmlToDom = function (html) {
    var contentDOM = [];
    var handler = new DomHandler(function (error, dom) {
        if (error) {
            console.log(error);
        } else {
            contentDOM = dom;
        }
    });
    var parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.done();
    return contentDOM
};

var exctractConfigFromURL = function (href) {
    return {};
};
var generateAdditionalParams = function (config) {
    var params = '/';
    if (config.theme) {
        params += config.theme + '/';
    }
    var colors = _.chain(config).omit('href', 'type', 'theme', 'tabs', 'width', 'height').reduce(function (colors, value, color) {
        colors += color + '=' + value + '&';
        return colors;
    }, '');
    colors = colors.replace(/&$/, '');
    return params + '?' + colors;
};

var generateUrl = function (config) {
    var additionalParam = generateAdditionalParams(config);
    var type = config.type == 'frame' ? 'embedded' : 'embed';
    return config.href + type + '/' + config.tabs.join(',') + additionalParam;
};

var creator = {
    script: function (config) {
        return '<script async src="' + generateUrl(config) + '" ></script>';
    },
    frame: function (config) {
        return [
            '<iframe',
            ' width=',
            '"' + (config.width ? config.width + 'px' : '100%') + '"',
            ' height=',
            '"' + (config.height ? config.height + 'px' : '100%') + '"',
            ' src="' + generateUrl(config) + '"',
            ' allowfullscreen="allowfullscreen" frameborder="0"',
            '>',
            '</iframe>'
        ].join('');
    }
};

var createEmbedNode = function (href, config) {
    var type = config.type || 'script';

    return htmlToDom(creator[type](_.defaults({href: href}, config, defautsConfig)))[0];
};

module.exports = function (rawHtml, config) {
    var contentDOM = htmlToDom(rawHtml);
    var links = domutils.find(function (element) {
        return element.attribs && element.attribs.href && matcher.test(element.attribs.href);
    }, contentDOM, true);
    links.forEach(function (link) {
        domutils.replaceElement(link, createEmbedNode(link.attribs.href, config))
    });
    return domutils.getOuterHTML(contentDOM);
};
