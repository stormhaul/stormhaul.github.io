import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {RenderableInterface} from "./renderable.interface";
import {Context} from "./context";
import {Mouse} from "../user-interface/mouse";
import {RenderableParent} from "./renderable.parent";
import {Button} from "../user-interface/button";
import {Point} from "../helpers/point";
import {Layer} from "./viewport-panels/layer";

export abstract class Scene extends RenderableParent{
    private panels: Array<ViewportPanel> = [];
    protected mouse: Mouse;
    protected active: boolean;

    constructor(mouse: Mouse) {
        super();

        this.mouse           = mouse;
        this.active          = false;
    }

    addPanel(panel: ViewportPanel): number {
        this.panels.push(panel);
        return this.panels.length - 1;
    }

    activate(): void {
        this.panels.map(panel => {
            panel.activate();
        });
        this.active = true;
    }

    deactivate(): void {
        this.panels.map(panel => {
            panel.deactivate();
        });
        this.active = false;
    }

    render(context: Context): void {
        this.panels.map((panel) => {
            panel.render(context);
        });
    }

    protected buttonHover(button: Button, relativePos: Point): void {
        if (button.isBounding(relativePos)) {
            button.setHover(true);
        } else {
            button.setHover(false);
        }
    }

    protected buttonClick(button: Button, relativePos: Point): void {
        if (button.isBounding(relativePos)) {
            button.trigger();
        }
    }
}