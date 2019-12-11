define(["require", "exports", "../../user-input/conditional.subscriber", "../renderable.parent"], function (require, exports, conditional_subscriber_1, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewportPanel extends renderable_parent_1.RenderableParent {
        constructor(mouse, offset, width, height, moveHandler, clickHandler) {
            super();
            this.layers = [];
            this.offset = offset;
            this.width = width;
            this.height = height;
            this.leftBound = offset.x;
            this.topBound = offset.y;
            this.rightBound = offset.x + width;
            this.botBound = offset.y + height;
            this.mouse = mouse;
            this.active = false;
            let moveSubscriber = new conditional_subscriber_1.ConditionalSubscriber(() => {
                return this.active && this.isBounding(this.mouse.getMousePosition());
            }, () => {
                moveHandler(this.mouse.getMousePosition());
            });
            let clickSubscriber = new conditional_subscriber_1.ConditionalSubscriber(() => {
                return this.active && this.isBounding(this.mouse.getMousePosition());
            }, () => {
                clickHandler(this.mouse.getMousePosition());
            });
            this.mouse.subscribe('move', moveSubscriber);
        }
        activate() {
            this.active = true;
        }
        deactivate() {
            this.active = false;
        }
        isBounding(p) {
            return p.x >= this.leftBound && p.x < this.rightBound && p.y >= this.topBound && p.y < this.botBound;
        }
        prioritizeLayers() {
            this.layers.sort((a, b) => { return a.getPriority() - b.getPriority(); });
        }
        addLayer(layer) {
            this.layers.push(layer);
            this.prioritizeLayers();
        }
        render(context) {
            this.layers.map((layer) => {
                layer.render(context);
            });
        }
        getOffset() {
            return this.offset;
        }
    }
    exports.ViewportPanel = ViewportPanel;
});
//# sourceMappingURL=viewport.panel.js.map