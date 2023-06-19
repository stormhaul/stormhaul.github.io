define(["require", "exports", "./rendering/context", "./rendering/menu.scene", "./user-interface/mouse", "./rendering/game.scene", "./rendering/settings.scene", "./controllers/scene.controller"], function (require, exports, context_1, menu_scene_1, mouse_1, game_scene_1, settings_scene_1, scene_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Main = void 0;
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
            let menuScene = new menu_scene_1.MenuScene(mouse);
            let gameScene = new game_scene_1.GameScene(mouse);
            let settingsScene = new settings_scene_1.SettingsScene(mouse);
            this.sceneController = new scene_controller_1.SceneController(menuScene);
            this.sceneController.addScene(gameScene, 'game.button.clicked');
            this.sceneController.addScene(settingsScene, 'settings.button.clicked');
            this.run();
        }
        run() {
            requestAnimationFrame(() => {
                this.run();
            });
            this.sceneController.renderActiveScene(this.context);
        }
    }
    exports.Main = Main;
});
