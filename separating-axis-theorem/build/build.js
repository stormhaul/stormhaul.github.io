define(["require", "exports", "./config", "./rendering/context", "./geometry/polygon", "./geometry/point"], function (require, exports, config_1, context_1, polygon_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Build {
        constructor() {
            let config = new config_1.Config();
            let context = new context_1.Context(config);
            let poly = new polygon_1.Polygon(new point_1.Point(150, 150), 5, 10);
            console.log(poly);
        }
    }
    exports.Build = Build;
});
