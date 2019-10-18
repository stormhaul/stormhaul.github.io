import {Scene} from "./scene";
import {Layer} from "./viewport-panels/layer";
import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {Point} from "../helpers/point";
import {Mouse} from "../user-input/mouse";
import {Button} from "../user-input/button";
import {TextElement} from "../user-input/text.element";

export class MenuScene extends Scene{
    private backgroundLayer: Layer;
    private separatorLayer: Layer;
    private textLayer: Layer;
    private buttonLayer: Layer;
    private startButton: Button;

    private panel: ViewportPanel;

    constructor(mouse: Mouse) {
        super(mouse);

        this.backgroundLayer = new Layer();
        this.separatorLayer  = new Layer(1);
        this.textLayer       = new Layer(2);
        this.buttonLayer     = new Layer(3);

        this.panel = new ViewportPanel(this.mouse, new Point(0,0), window.innerWidth, window.innerHeight, this.moveHandler, this.clickHandler);
        this.addPanel(this.panel);

        this.panel.addLayer(this.backgroundLayer);
        this.panel.addLayer(this.separatorLayer);
        this.panel.addLayer(this.textLayer);
        this.panel.addLayer(this.buttonLayer);

        let startLabel = new TextElement().setValue('Start');
        let startButton = new Button(new Point(50, 50), 150, 40, startLabel, new Event('start.button.clicked'));
        let startId = this.buttonLayer.addItem(startButton);

        this.startButton = startButton;
    }

    moveHandler(position: Point): void {
        let relativePos = position.sub(this.panel.getOffset());
        if (this.startButton.isBounding(relativePos)) {
            this.startButton.setHover(true);
        } else {
            this.startButton.setHover(false);
        }
    }

    clickHandler(position: Point): void {
        let relativePos = position.sub(this.panel.getOffset());
        if (this.startButton.isBounding(relativePos)) {
            this.startButton.trigger()
        }
    }

}