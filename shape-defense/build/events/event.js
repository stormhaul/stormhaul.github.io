define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventPayload = void 0;
    class EventPayload extends Event {
        constructor(name, payload) {
            super(name);
            this.payload = payload;
        }
        getPayload() {
            return this.payload;
        }
    }
    exports.EventPayload = EventPayload;
});