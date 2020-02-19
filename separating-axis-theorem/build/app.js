define(["require", "exports", "./config", "./rendering/context", "./geometry/polygon", "./geometry/point"], function (require, exports, config_1, context_1, polygon_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            let config = new config_1.Config();
            let context = new context_1.Context(config);
            let poly = new polygon_1.Polygon(new point_1.Point(450, 250), 5, 100);
            let poly2 = new polygon_1.Polygon(new point_1.Point(1000, 400), 4, 100);
            let poly3 = new polygon_1.Polygon(new point_1.Point(450, 300), 3, 100);
            let polys = [poly, poly2, poly3];
            this.context = context;
            this.polys = polys;
            this.loop();
        }
        loop() {
            this.context.clear();
            this.context.drawPolygons(this.polys);
        }
    }
    exports.App = App;
});
