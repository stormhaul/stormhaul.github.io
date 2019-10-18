"use strict";
exports.__esModule = true;
var ConditionalSubscriber = /** @class */ (function () {
    function ConditionalSubscriber(condition, callback) {
        this.condition = condition;
        this.callback = callback;
    }
    ConditionalSubscriber.prototype.execute = function () {
        if (this.condition()) {
            this.callback();
        }
    };
    return ConditionalSubscriber;
}());
exports.ConditionalSubscriber = ConditionalSubscriber;
