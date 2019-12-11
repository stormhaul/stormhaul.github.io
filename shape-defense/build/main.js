define(["require", "exports", "./rendering/context", "./rendering/menu.scene", "./user-input/mouse"], function (require, exports, context_1, menu_scene_1, mouse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        constructor() {
            this.DEFAULT_RESOLUTION_HEIGHT = window.innerHeight;
            this.DEFAULT_RESOLUTION_WIDTH = window.innerWidth;
        }
        setup() {
            this.canvas = document.getElementById('canvas');
            this.canvas.height = this.DEFAULT_RESOLUTION_HEIGHT;
            this.canvas.width = this.DEFAULT_RESOLUTION_WIDTH;
            this.ctx = this.canvas.getContext('2d');
            this.context = new context_1.Context(this.ctx);
            let mouse = new mouse_1.Mouse();
            this.menuScene = new menu_scene_1.MenuScene(mouse);
            this.menuScene.activate();
            this.run();
        }
        run() {
            requestAnimationFrame(() => {
                this.run();
            });
            this.menuScene.render(this.context);
        }
    }
    exports.Main = Main;
});
