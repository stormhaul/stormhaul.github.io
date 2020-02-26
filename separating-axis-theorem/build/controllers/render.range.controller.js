define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RenderRangeController {
        constructor(rootObject, config) {
            this.rootObject = rootObject;
            this.maxMapSize = Math.max(config.canvas.width, config.canvas.height);
        }
        getRenderablesInRange(renderables) {
            let inRange = [];
            let root = this.rootObject.position;
            renderables.map(renderable => {
                let margin = renderable.getMargin();
                if (root.dist(renderable.position) <= this.maxMapSize + margin) {
                    inRange.push(renderable);
                }
            });
            return inRange;
        }
    }
    exports.RenderRangeController = RenderRangeController;
});
