define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Timer {
        constructor(start, increment, eventIncrement, event) {
            this.start = start;
            this.increment = increment;
            this.eventIncrement = eventIncrement;
            this.event = event;
            this.current = this.start;
        }
        tick() {
            this.current += this.increment;
            if ((this.current - this.start) % this.eventIncrement === 0) {
                this.event();
            }
        }
    }
    exports.Timer = Timer;
});
