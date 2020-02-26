define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Config {
        constructor() {
            this.canvas = {
                id: 'canvas',
                width: Math.floor(window.innerWidth),
                height: Math.floor(window.innerHeight)
            };
            this.context = {
                type: '2d',
                polygon: {
                    fillOrStroke: 'stroke',
                    showNormals: false,
                    showProjections: true,
                    showProjectionGuides: false,
                    color: 'white',
                    lineWidth: 1
                }
            };
        }
    }
    exports.Config = Config;
});
