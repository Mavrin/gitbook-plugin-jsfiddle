var replace = require('./src/replace');
module.exports = {
    hooks: {
        'page': function (page) {
            var config = this.getConfig('pluginsConfig') || {};
            page.sections[0].content = replace(page.sections[0].content, config.jsfiddle);
            return page;
        }
    }
};