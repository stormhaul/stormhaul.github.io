define(["require", "exports", "../renderable.parent"], function (require, exports, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Layer extends renderable_parent_1.RenderableParent {
        constructor(priority) {
            super();
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
