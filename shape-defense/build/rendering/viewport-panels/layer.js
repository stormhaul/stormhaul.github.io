define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Layer {
        constructor(priority) {
            this.rgstCounter = 0;
            this.renderables = {};
            if (priority === undefined) {
                priority = 0;
            }
            this.priority = priority;
        }
        addItem(renderable) {
            this.renderables[this.rgstCounter] = renderable;
            return this.rgstCounter++;
        }
        removeItem(id) {
            delete this.renderables[id];
        }
        render(context) {
            for (let i in this.renderables) {
                this.renderables[i].render(context);
            }
        }
        getPriority() {
            return this.priority;
        }
    }
    exports.Layer = Layer;
});
//# sourceMappingURL=layer.js.map