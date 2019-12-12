import {Context} from "./rendering/context";
import {MenuScene} from "./rendering/menu.scene";
import {Mouse} from "./user-input/mouse";
import {GameScene} from "./rendering/game.scene";
import {SettingsScene} from "./rendering/settings.scene";
import {SceneController} from "./controllers/scene.controller";

export class Main {
    private canvas;
    private ctx;
    private context;
    private sceneController;

    private DEFAULT_RESOLUTION_HEIGHT: number = window.innerHeight;
    private DEFAULT_RESOLUTION_WIDTH: number = window.innerWidth;

    setup(): void {
        this.canvas = document.getElementById('canvas');
        this.canvas.height = this.DEFAULT_RESOLUTION_HEIGHT;
        this.canvas.width = this.DEFAULT_RESOLUTION_WIDTH;

        this.ctx = this.canvas.getContext('2d');

        this.context = new Context(this.ctx);
        let mouse = new Mouse();

        let menuScene = new MenuScene(mouse);
        let gameScene = new GameScene(mouse);
        let settingsScene = new SettingsScene(mouse);

        this.sceneController = new SceneController(menuScene);
        this.sceneController.addScene(gameScene, 'game.button.clicked');
        this.sceneController.addScene(settingsScene, 'settings.button.clicked');

        this.run();
    }

    run(): void {
        requestAnimationFrame(() => {
            this.run();
        });

        this.sceneController.renderActiveScene(this.context);
    }
}