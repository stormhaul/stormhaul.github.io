define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValuePayload = void 0;
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
