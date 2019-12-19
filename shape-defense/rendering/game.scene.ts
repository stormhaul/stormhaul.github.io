import {Scene} from "./scene";
import {Mouse} from "../user-interface/mouse";
import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {Point} from "../helpers/point";
import {Layer} from "./viewport-panels/layer";

export class GameScene extends Scene {
    private topbarPanel: ViewportPanel;
    private topBackgroundLayer: Layer;
    private topSeparatorLayer: Layer;
    private topTextLayer: Layer;
    private topButtonLayer: Layer;

    private rightbarPanel: ViewportPanel;
    private rightBackgroundLayer: Layer;
    private rightSeparatorLayer: Layer;
    private rightTextLayer: Layer;
    private rightButtonLayer: Layer;

    private mapPanel: ViewportPanel;
    private mapBackgroundLayer: Layer;
    private mapSeparatorLayer: Layer;
    private mapGameViewLayer: Layer;

    constructor(mouse: Mouse) {
        super(mouse);

        this.initializeLayers(mouse);
    }

    /**
     * Sets up the panels and attaches their layers.
     * @param mouse
     */
    private initializeLayers(mouse: Mouse): this {
        let topbarHeight  = 50;
        let rightbarWidth = 50;

        this.topbarPanel = new ViewportPanel(
            mouse,
            new Point(0,0),
            window.innerWidth,
            topbarHeight,
            () => {},
            () => {}
        );

        this.rightbarPanel = new ViewportPanel(
            mouse,
            new Point(
                window.innerWidth - rightbarWidth,
                topbarHeight
            ),
            rightbarWidth,
            window.innerHeight - topbarHeight,
            () => {},
            () => {}
        );

        this.mapPanel = new ViewportPanel(
            mouse,
            new Point(0, topbarHeight),
            window.innerWidth - rightbarWidth,
            window.innerHeight - topbarHeight,
            () => {},
            () => {}
        );

        this
            .initializePanel(
                this.topbarPanel,
                [
                    this.topBackgroundLayer,
                    this.topSeparatorLayer,
                    this.topTextLayer,
                    this.topButtonLayer
                ]
            )
            .initializePanel(
                this.rightbarPanel,
                [
                    this.rightBackgroundLayer,
                    this.rightSeparatorLayer,
                    this.rightTextLayer,
                    this.rightButtonLayer
                ]
            )
            .initializePanel(
                this.mapPanel,
                [
                    this.mapBackgroundLayer,
                    this.mapSeparatorLayer,
                    this.mapGameViewLayer
                ]
            );

        return this;
    }

    /**
     * @param panel
     * @param layers
     */
    private initializePanel(panel: ViewportPanel, layers: Array<Layer>): this {
        this.addPanel(panel);

        layers.map( layer => {
            panel.addLayer(layer);
        });

        return this;
    }
}