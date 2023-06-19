define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Subscriber = void 0;
    class Subscriber {
        constructor(callback) {
            this.callback = callback;
        }
        active() {
            return true;
        }
        execute() {
            this.callback();
        }
    }
    exports.Subscriber = Subscriber;
});
