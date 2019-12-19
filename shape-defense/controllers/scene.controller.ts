import {Context} from "../rendering/context";
import {Scene} from "../rendering/scene";
import {Button} from "../user-input/button";
import {Point} from "../helpers/point";

export class SceneController {
    private scenes: Array<Scene>;
    private keys: Array<string>;

    constructor(scene: Scene) {
        this.scenes = [];
        this.keys = [];

        this.addScene(scene, 'menu.button.clicked');
        this.scenes[0].activate();
    }

    addScene(scene: Scene, listenerKey: string): void {
        this.scenes.push(scene);
        this.keys.push(listenerKey);
        this.addListener(listenerKey);
    }

    private addListener(key: string): void {
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
        })
    }

    renderActiveScene(context: Context): void {
        context.clear();
        this.scenes.map((scene) => {
            scene.render(context);
        })
    }
}