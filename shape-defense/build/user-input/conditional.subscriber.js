define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConditionalSubscriber {
        constructor(condition, callback) {
            this.condition = condition;
            this.callback = callback;
        }
        execute() {
            if (this.condition()) {
                this.callback();
            }
        }
    }
    exports.ConditionalSubscriber = ConditionalSubscriber;
});
