define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Subscriber {
        constructor(callback) {
            this.callback = callback;
        }
        execute() {
            this.callback();
        }
    }
    exports.Subscriber = Subscriber;
});
