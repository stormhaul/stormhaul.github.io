import {Scene} from "./scene";
import {Layer} from "./viewport-panels/layer";
import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {Point} from "../helpers/point";
import {Mouse} from "../user-interface/mouse";
import {Button} from "../user-interface/button";
import {TextElement} from "../user-interface/text.element";
import {Backdrop} from "../user-interface/backdrop";

export class MenuScene extends Scene {
    private backgroundLayer: Layer;
    private separatorLayer: Layer;
    private textLayer: Layer;
    private buttonLayer: Layer;
    private startButton: Button;
    private settingsButton: Button;

    private panel: ViewportPanel;

    constructor(mouse: Mouse) {
        super(mouse);

        this.backgroundLayer = new Layer();
        this.separatorLayer  = new Layer(1);
        this.textLayer       = new Layer(2);
        this.buttonLayer     = new Layer(3);

        this.panel = new ViewportPanel(this.mouse, new Point(0,0), window.innerWidth, window.innerHeight, this.moveHandler.bind(this), this.clickHandler.bind(this));
        this.addPanel(this.panel);

        this.panel.addLayer(this.backgroundLayer);
        this.panel.addLayer(this.separatorLayer);
        this.panel.addLayer(this.textLayer);
        this.panel.addLayer(this.buttonLayer);

        // @todo Error in padding logic for backdrop since buttonds are ignoring the parent offset bonus points from margin, padding, adn border width.
        // Menu Background
        let backdropWidth = 600;
        let backdrop = new Backdrop(new Point((window.innerWidth - backdropWidth) / 2,0), backdropWidth, 500, '#333');
        this.backgroundLayer.addItem(backdrop);

        // Menu Buttons
        let startLabel = new TextElement().setValue('Start');
        let startButton = new Button(new Point(225, 10), 150, 40, startLabel, new Event('game.button.clicked'));
        startButton.attachParent(backdrop);
        let startId = this.buttonLayer.addItem(startButton);

        let settingsLabel = new TextElement().setValue('Settings');
        let settingsButton = new Button(new Point(225, 60), 150, 40, settingsLabel, new Event('settings.button.clicked'));
        settingsButton.attachParent(backdrop);
        let settingsId = this.buttonLayer.addItem(settingsButton);

        this.startButton = startButton;
        this.settingsButton = settingsButton;
    }

    moveHandler(position: Point): void {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.panel.getOffset());
        this.buttonHover(this.startButton, relativePos);
        this.buttonHover(this.settingsButton, relativePos);
    }

    clickHandler(position: Point): void {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.panel.getOffset());
        this.buttonClick(this.startButton, relativePos);
        this.buttonClick(this.settingsButton, relativePos);
    }
}