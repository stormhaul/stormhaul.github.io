import {Scene} from "./scene";
import {Mouse} from "../user-input/mouse";
import {Slider} from "../user-input/slider";
import {Point} from "../helpers/point";
import {Layer} from "./viewport-panels/layer";
import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {Backdrop} from "../user-input/backdrop";
import {TextElement} from "../user-input/text.element";

export class SettingsScene extends Scene {
    private backgroundLayer: Layer;
    private separatorLayer: Layer;
    private textLayer: Layer;
    private buttonLayer: Layer;
    private volumeSlider: Slider;
    private panel: ViewportPanel;

    constructor(mouse: Mouse) {
        super(mouse);

        this.backgroundLayer = new Layer();
        this.separatorLayer  = new Layer(1);
        this.textLayer       = new Layer(2);
        this.buttonLayer     = new Layer(3);

        this.panel = new ViewportPanel(this.mouse, new Point(0,0), window.innerWidth, window.innerHeight, () => {}, this.clickHandler.bind(this));
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

        this.buttonLayer.addItem(this.volumeSlider);
    }

    clickHandler(point: Point): void {
        if (!this.active) {
            return;
        }
        if (this.volumeSlider.isBounding(point)) {
            this.volumeSlider.clickHandler(point);
        }
    }
}