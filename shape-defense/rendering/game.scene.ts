import {Scene} from './scene';
import {Mouse} from '../user-interface/mouse';
import {ViewportPanel} from './viewport-panels/viewport.panel';
import {Point} from '../helpers/point';
import {Layer} from './viewport-panels/layer';
import {Frame} from '../user-interface/frame';
import {Button} from '../user-interface/button';
import {TextElement} from '../user-interface/text.element';
import {LevelOne} from '../maps/level.one';
import {Gold} from "../player/resources/gold";
import {Lives} from "../player/resources/lives";

export class GameScene extends Scene
{
    private topBarPanel: ViewportPanel;
    private topBackgroundLayer: Layer;
    private topSeparatorLayer: Layer;
    private topTextLayer: Layer;
    private topButtonLayer: Layer;

    private rightBarPanel: ViewportPanel;
    private rightBackgroundLayer: Layer;
    private rightSeparatorLayer: Layer;
    private rightTextLayer: Layer;
    private rightButtonLayer: Layer;

    private mapPanel: ViewportPanel;
    private mapBackgroundLayer: Layer;
    private mapSeparatorLayer: Layer;
    private mapGameViewLayer: Layer;

    private goldResource: Gold;
    private livesResource: Lives;
    private menuButton: Button;
    private level1: LevelOne;

    constructor(mouse: Mouse)
    {
        super(mouse);

        this.initializeLayers(mouse);

        this.menuButton = new Button(
            new Point(window.innerWidth - 42 - 3, 5),
            40,
            40,
            new TextElement().setValue('Menu'),
            new Event('menu.button.clicked')
        );
        this.menuButton.attachParent(this.topButtonLayer);
        this.topButtonLayer.addItem(this.menuButton);

        this.goldResource = new Gold(new Point(5, 5), 500);
        this.goldResource.attachParent(this.topButtonLayer);
        this.topButtonLayer.addItem(this.goldResource);

        this.livesResource = new Lives(new Point(105, 5), 20);
        this.livesResource.attachParent(this.topButtonLayer);
        this.topButtonLayer.addItem(this.livesResource);
    }

    /**
     * Sets up the panels and attaches their layers.
     * @param mouse
     */
    private initializeLayers(mouse: Mouse): this
    {
        let topbarHeight  = 50;
        let rightbarWidth = 50;

        this.topBarPanel        = new ViewportPanel(
            mouse,
            new Point(0, 0),
            window.innerWidth,
            topbarHeight,
            this.topBarMoveHandler.bind(this),
            this.topBarClickHandler.bind(this)
        );
        this.topBackgroundLayer = new Layer();
        this.topSeparatorLayer  = new Layer(9);
        this.topTextLayer       = new Layer(2);
        this.topButtonLayer     = new Layer(3);

        this.rightBarPanel        = new ViewportPanel(
            mouse,
            new Point(
                window.innerWidth - rightbarWidth,
                topbarHeight
            ),
            rightbarWidth,
            window.innerHeight - topbarHeight,
            () =>
            {
            },
            () =>
            {
            }
        );
        this.rightBackgroundLayer = new Layer();
        this.rightSeparatorLayer  = new Layer(9);
        this.rightTextLayer       = new Layer(2);
        this.rightButtonLayer     = new Layer(3);

        this.mapPanel           = new ViewportPanel(
            mouse,
            new Point(0, topbarHeight),
            window.innerWidth - rightbarWidth,
            window.innerHeight - topbarHeight,
            () =>
            {
            },
            () =>
            {
            }
        );
        this.mapBackgroundLayer = new Layer();
        this.mapSeparatorLayer  = new Layer(9);
        this.mapGameViewLayer   = new Layer(2);

        this
            .initializePanel(
                this.topBarPanel,
                [
                    this.topBackgroundLayer,
                    this.topSeparatorLayer,
                    this.topTextLayer,
                    this.topButtonLayer
                ]
            )
            .initializePanel(
                this.rightBarPanel,
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

        let topFrame = new Frame(new Point(1.5, 1.5), window.innerWidth - 3, topbarHeight - 3);
        topFrame.attachParent(this.topBarPanel);
        this.topSeparatorLayer.addItem(
            topFrame
        );

        let rightFrame = new Frame(new Point(1.5, 1.5), rightbarWidth - 3, window.innerHeight - topbarHeight - 3);
        rightFrame.attachParent(this.rightBarPanel);
        this.rightSeparatorLayer.addItem(
            rightFrame
        );

        let mapFrame = new Frame(
            new Point(1.5, 1.5),
            window.innerWidth - rightbarWidth - 3,
            window.innerHeight - topbarHeight - 3,
            '#222'
        );
        mapFrame.attachParent(this.mapPanel);
        this.mapSeparatorLayer.addItem(
            mapFrame
        );

        let level1 = new LevelOne(
            window.innerWidth - rightbarWidth,
            window.innerHeight - topbarHeight
        );
        level1.attachParent(this.mapPanel);
        this.topButtonLayer.addItem(level1);
        this.level1 = level1;

        return this;
    }

    /**
     * @param panel
     * @param layers
     */
    private initializePanel(panel: ViewportPanel, layers: Array<Layer>): this
    {
        this.addPanel(panel);

        layers.map(
            layer =>
            {
                panel.addLayer(layer);
            }
        );

        return this;
    }

    topBarClickHandler(position: Point): void
    {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.topBarPanel.getOffset());
        this.buttonClick(this.menuButton, relativePos);
    }

    topBarMoveHandler(position: Point): void
    {
        if (!this.active) {
            return;
        }
        let relativePos = position.sub(this.topBarPanel.getOffset());
        this.buttonHover(this.menuButton, relativePos);
    }

    activate(): void
    {
        super.activate();

        this.level1.start();
    }

    deactivate(): void
    {
        super.deactivate();

        this.level1.stop();
    }
}