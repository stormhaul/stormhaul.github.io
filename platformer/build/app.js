define(["require", "exports", "./config", "p5"], function (require, exports, config_1, p5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor(p) {
            let config = new config_1.Config();
            console.log(config, p5);
        }
    }
    exports.App = App;
});
//# sourceMappingURL=app.js.map