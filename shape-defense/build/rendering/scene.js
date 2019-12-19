define(["require", "exports", "./renderable.parent"], function (require, exports, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scene extends renderable_parent_1.RenderableParent {
        constructor(mouse) {
            super();
            this.panels = [];
            this.mouse = mouse;
            this.active = false;
        }
        addPanel(panel) {
            this.panels.push(panel);
            return this.panels.length - 1;
        }
        activate() {
            this.panels.map(panel => {
                panel.activate();
            });
            this.active = true;
        }
        deactivate() {
            this.panels.map(panel => {
                panel.deactivate();
            });
            this.active = false;
        }
        render(context) {
            this.panels.map((panel) => {
                panel.render(context);
            });
        }
        buttonHover(button, relativePos) {
            if (button.isBounding(relativePos)) {
                button.setHover(true);
            }
            else {
                button.setHover(false);
            }
        }
        buttonClick(button, relativePos) {
            if (button.isBounding(relativePos)) {
                button.trigger();
            }
        }
    }
    exports.Scene = Scene;
});
