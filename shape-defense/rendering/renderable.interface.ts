import {Context} from "./context";

export interface RenderableInterface {
    render(context: Context): void;
}