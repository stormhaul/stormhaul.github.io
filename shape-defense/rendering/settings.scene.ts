import {Scene} from "./scene";
import {Mouse} from "../user-input/mouse";
import {Slider} from "../user-input/slider";
import {Point} from "../helpers/point";
import {Layer} from "./viewport-panels/layer";
import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {Backdrop} from "../user-input/backdrop";
import {TextElement} from "../user-input/text.element";
import {Button} from "../user-input/button";

export class SettingsScene extends Scene {
    private backgroundLayer: Layer;
    private separatorLayer: Layer;
    private textLayer: Layer;
    private buttonLayer: Layer;
    private volumeSlider: Slider;
    private backButton: Button;
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

        // Menu Background
        let backdropWidth = 600;
        let backdrop = new Backdrop(new Point((window.innerWidth - backdropWidth) / 2,0), backdropWidth, 500, '#333');
        this.backgroundLayer.addItem(backdrop);

        let volumeLabel = new TextElement().setValue('Volume').setPosition(new Point(900, 25)).setColor('white');
        volumeLabel.attachParent(backdrop);
        this.textLayer.addItem(volumeLabel);

        this.volumeSlider = new Slider('volume', 0, 100, 1, new Point(50,50), 500, 50);
        this.volumeSlider.attachParent(backdrop);

        let backLabel = new TextElement().setValue('Back');
        this.backButton = new Button(
            new Point(225, 450),
            150,
            40,
            backLabel,
            new Event('menu.button.clicked')
        );
        this.backButton.attachParent(backdrop);

        this.buttonLayer.addItem(this.volumeSlider);
        this.buttonLayer.addItem(this.backButton);
    }

    moveHandler(position: Point): void {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.panel.getOffset());
        this.buttonHover(this.backButton, relativePos);
    }

    clickHandler(position: Point): void {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.panel.getOffset());

        if (this.volumeSlider.isBounding(position)) {
            this.volumeSlider.clickHandler(position);
        }

        this.buttonClick(this.backButton, relativePos);
    }
}