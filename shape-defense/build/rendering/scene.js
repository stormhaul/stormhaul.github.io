define(["require", "exports", "./renderable.parent"], function (require, exports, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene extends renderable_parent_1.RenderableParent {
        constructor(mouse) {
            super();
            this.panels = [];
            this.mouse = mouse;
        }
        addPanel(panel) {
            this.panels.push(panel);
            return this.panels.length - 1;
        }
        activate() {
            this.panels.map(panel => {
                panel.activate();
            });
        }
        deactivate() {
            this.panels.map(panel => {
                panel.deactivate();
            });
        }
        render(context) {
            this.panels.map((panel) => {
                panel.render(context);
            });
        }
    }
    exports.Scene = Scene;
});
