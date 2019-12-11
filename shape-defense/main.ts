import {Context} from "./rendering/context";
import {MenuScene} from "./rendering/menu.scene";
import {Mouse} from "./user-input/mouse";

export class Main {
    private canvas;
    private ctx;
    private context;
    private menuScene;

    private DEFAULT_RESOLUTION_HEIGHT: number = window.innerHeight;
    private DEFAULT_RESOLUTION_WIDTH: number = window.innerWidth;

    setup(): void {
        this.canvas = document.getElementById('canvas');
        this.canvas.height = this.DEFAULT_RESOLUTION_HEIGHT;
        this.canvas.width = this.DEFAULT_RESOLUTION_WIDTH;

        this.ctx = this.canvas.getContext('2d');

        this.context = new Context(this.ctx);
        let mouse = new Mouse();
        this.menuScene = new MenuScene(mouse);

        this.menuScene.activate();
        this.run();
    }

    run(): void {
        requestAnimationFrame(() => {
            this.run();
        });
        this.menuScene.render(this.context);
    }
}