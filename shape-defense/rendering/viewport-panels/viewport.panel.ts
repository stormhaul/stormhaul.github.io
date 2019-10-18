import {Point} from "../../helpers/point";
import {Mouse} from "../../user-input/mouse";
import {ConditionalSubscriber} from "../../user-input/conditional.subscriber";
import {Layer} from "./layer";
import {Context} from "../context";
import {RenderableInterface} from "../renderable.interface";

export class ViewportPanel implements RenderableInterface{
    private leftBound: number; // inclusive
    private rightBound: number; // exclusive
    private topBound: number; // inclusive
    private botBound: number; //exclusive
    private offset: Point;
    private width: number;
    private height: number;
    private mouse: Mouse;
    private active: boolean;
    private layers: Array<Layer> = [];

    constructor(mouse: Mouse, offset: Point, width: number, height: number, moveHandler: (position: Point) => void, clickHandler: (position: Point) => void) {
        this.offset     = offset;
        this.width      = width;
        this.height     = height;
        this.leftBound  = offset.x;
        this.topBound   = offset.y;
        this.rightBound = offset.x + width;
        this.botBound   = offset.y + height;
        this.mouse      = mouse;
        this.active     = false;

        let moveSubscriber = new ConditionalSubscriber(
            () => {
                return this.active && this.isBounding(this.mouse.getMousePosition());
            },
            () => {
                moveHandler(this.mouse.getMousePosition());
            }
        );

        let clickSubscriber = new ConditionalSubscriber(
            () => {
                return this.active && this.isBounding(this.mouse.getMousePosition());
            },
            () => {
                clickHandler(this.mouse.getMousePosition());
            }
        );
        this.mouse.subscribe('move', moveSubscriber);
    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }

    /**
     * This point must be a global point, not a local one.
     * @param p
     */
    isBounding(p: Point): boolean {
        return p.x >= this.leftBound && p.x < this.rightBound && p.y >= this.topBound && p.y < this.botBound;
    }

    /**
     * Reorders layers based on priority
     */
    private prioritizeLayers(): void {
        this.layers.sort((a: Layer, b: Layer) => {return a.getPriority() - b.getPriority()})
    }

    /**
     * Add Layer to panel
     * @param layer
     */
    addLayer(layer: Layer): void {
        this.layers.push(layer);
        this.prioritizeLayers();
    }

    /**
     * @param context
     */
    render(context: Context): void {
        this.layers.map((layer) => {
            layer.render(context);
        });
    }

    getOffset(): Point {
        return this.offset;
    }
}