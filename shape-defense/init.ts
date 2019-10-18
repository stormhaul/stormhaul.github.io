import {Main} from "./main";

export function init() {
    let app = new Main();
    app.setup();
    app.run();
}