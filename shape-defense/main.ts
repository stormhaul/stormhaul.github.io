import {Context} from "./rendering/context";
import {MenuScene} from "./rendering/menu.scene";
import {Mouse} from "./user-input/mouse";

export class Main {
    private canvas;
    private ctx;

    setup(): void {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        let context = new Context(this.ctx);
        let mouse = new Mouse();
        let menuScene = new MenuScene(mouse);
    }

    run(): void {

    }
}