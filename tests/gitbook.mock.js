define(function () {
    var handlers = {};
    return {
        events: {
            bind: function (name, callback) {
                handlers[name] = callback;
            }
        },
        fire: function (name, value) {
            handlers[name]({}, value);
        }
    }
});