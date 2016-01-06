module.exports = {
    /*book: {
        assets: "./book",
        js: [
            "plugin.js"
        ]
    },*/
    hooks: {
        'page': function(page) {
            debugger;
           console.log(arguments, this);
            return page;
        }
    }
};