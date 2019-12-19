import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {RenderableInterface} from "./renderable.interface";
import {Context} from "./context";
import {Mouse} from "../user-input/mouse";
import {RenderableParent} from "./renderable.parent";

export abstract class Scene extends RenderableParent{
    private panels: Array<ViewportPanel> = [];
    protected mouse: Mouse;
    protected active: boolean;

    constructor(mouse: Mouse) {
        super();

        this.mouse  = mouse;
        this.active = false;
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
}