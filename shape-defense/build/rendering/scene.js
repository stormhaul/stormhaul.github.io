define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene {
        constructor(mouse) {
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
//# sourceMappingURL=scene.js.map