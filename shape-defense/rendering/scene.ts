import {ViewportPanel} from "./viewport-panels/viewport.panel";
import {RenderableInterface} from "./renderable.interface";
import {Context} from "./context";
import {Mouse} from "../user-input/mouse";

export abstract class Scene implements RenderableInterface{
    private panels: Array<ViewportPanel> = [];
    protected mouse: Mouse;

    constructor(mouse: Mouse) {
        this.mouse = mouse;
    }

    addPanel(panel: ViewportPanel): number {
        this.panels.push(panel);
        return this.panels.length - 1;
    }

    activate(): void {
        this.panels.map(panel => {
            panel.activate();
        });
    }

    deactivate(): void {
        this.panels.map(panel => {
            panel.deactivate();
        });
    }

    render(context: Context): void {
        this.panels.map((panel) => {
            panel.render(context);
        });
    }
}