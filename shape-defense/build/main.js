define(["require", "exports", "./rendering/context", "./rendering/menu.scene", "./user-input/mouse"], function (require, exports, context_1, menu_scene_1, mouse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        setup() {
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
            let context = new context_1.Context(this.ctx);
            let mouse = new mouse_1.Mouse();
            let menuScene = new menu_scene_1.MenuScene(mouse);
            menuScene.render(context);
        }
        run() {
        }
    }
    exports.Main = Main;
});
