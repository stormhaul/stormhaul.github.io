define(["require", "exports", "./scene", "./viewport-panels/viewport.panel", "../helpers/point"], function (require, exports, scene_1, viewport_panel_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameScene extends scene_1.Scene {
        constructor(mouse) {
            super(mouse);
            let topbarHeight = 50;
            let rightbarWidth = 50;
            this.topbarPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(0, 0), window.innerWidth, topbarHeight, () => { }, () => { });
            this.rightbarPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(window.innerWidth - rightbarWidth, topbarHeight), rightbarWidth, window.innerHeight - topbarHeight, () => { }, () => { });
            this.mapPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(0, topbarHeight), window.innerWidth - rightbarWidth, window.innerHeight - topbarHeight, () => { }, () => { });
            this.addPanel(this.topbarPanel);
            this.addPanel(this.rightbarPanel);
            this.addPanel(this.mapPanel);
        }
    }
    exports.GameScene = GameScene;
});
