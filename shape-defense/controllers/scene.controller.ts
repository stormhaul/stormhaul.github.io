import {Context} from "../rendering/context";
import {Scene} from "../rendering/scene";

export class SceneController {
    private scenes: Array <Scene>;

    constructor(scenes: Array <Scene>) {
        this.scenes = scenes;

        if (this.scenes.length > 0) {
            this.scenes[0].activate();
        }
    }

    renderActiveScene(context: Context): void {
        this.scenes.map((scene) => {
            scene.render(context);
        })
    }
}