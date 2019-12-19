define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConditionalSubscriber {
        constructor(condition, callback) {
            this.condition = condition;
            this.callback = callback;
        }
        active() {
            return this.condition();
        }
        execute() {
            if (this.condition()) {
                this.callback();
            }
        }
    }
    exports.ConditionalSubscriber = ConditionalSubscriber;
});
