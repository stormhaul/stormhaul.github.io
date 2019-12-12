define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SceneController {
        constructor(scenes) {
            this.scenes = scenes;
            if (this.scenes.length > 0) {
                this.scenes[0].activate();
            }
        }
        renderActiveScene(context) {
            this.scenes.map((scene) => {
                scene.render(context);
            });
        }
    }
    exports.SceneController = SceneController;
});
