var replace = require('./src/replace');
module.exports = {
    /*book: {
        assets: "./book",
        js: [
            "plugin.js"
        ]
    },*/
    hooks: {
        'page': function(page) {
            page.sections[0].content = replace(page.sections[0].content);
            return page;
        }
    }
};