import {RenderableInterface} from "../renderable.interface";
import {Map} from "../../helpers/map.interface";
import {Context} from "../context";

export class Layer implements RenderableInterface{
    private rgstCounter: number = 0;
    private renderables: Map = {};
    private priority: number;

    constructor(priority?: number) {
        if (priority === undefined) {
            priority = 0;
        }

        this.priority = priority;
    }

    addItem(renderable: RenderableInterface): number {
        this.renderables[this.rgstCounter] = renderable;
        return this.rgstCounter++;
    }

    removeItem(id: number) {
        delete this.renderables[id];
    }

    render(context: Context): void {
        this.renderables.map(renderable => {
            renderable.render(context);
        });
    }

    getPriority(): number {
        return this.priority;
    }
}