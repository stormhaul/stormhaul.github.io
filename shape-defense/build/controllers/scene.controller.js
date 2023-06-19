define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SceneController = void 0;
    class SceneController {
        constructor(scene) {
            this.scenes = [];
            this.keys = [];
            this.addScene(scene, 'menu.button.clicked');
            this.scenes[0].activate();
        }
        addScene(scene, listenerKey) {
            this.scenes.push(scene);
            this.keys.push(listenerKey);
            this.addListener(listenerKey);
        }
        addListener(key) {
            document.addEventListener(key, () => {
                console.log('swap scene called', this.scenes);
                let index = this.keys.indexOf(key);
                if (index === -1) {
                    throw new Error('Switching to scene which wasnt found ' + key);
                }
                this.scenes.map((scene) => {
                    scene.deactivate();
                });
                this.scenes[index].activate();
            });
        }
        renderActiveScene(context) {
            context.clear();
            this.scenes.map((scene) => {
                scene.render(context);
            });
        }
    }
    exports.SceneController = SceneController;
});
