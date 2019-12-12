define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ValuePayload {
        constructor(value) {
            this.value = value;
        }
        getValue() {
            return this.value;
        }
    }
    exports.ValuePayload = ValuePayload;
});
