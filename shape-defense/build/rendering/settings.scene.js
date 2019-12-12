define(["require", "exports", "./scene", "../user-input/slider", "../helpers/point", "./viewport-panels/layer", "./viewport-panels/viewport.panel"], function (require, exports, scene_1, slider_1, point_1, layer_1, viewport_panel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SettingsScene extends scene_1.Scene {
        constructor(mouse) {
            super(mouse);
            this.backgroundLayer = new layer_1.Layer();
            this.separatorLayer = new layer_1.Layer(1);
            this.textLayer = new layer_1.Layer(2);
            this.buttonLayer = new layer_1.Layer(3);
            this.panel = new viewport_panel_1.ViewportPanel(this.mouse, new point_1.Point(0, 0), window.innerWidth, window.innerHeight, () => { }, this.clickHandler.bind(this));
            this.addPanel(this.panel);
            this.panel.addLayer(this.backgroundLayer);
            this.panel.addLayer(this.separatorLayer);
            this.panel.addLayer(this.textLayer);
            this.panel.addLayer(this.buttonLayer);
            this.volumeSlider = new slider_1.Slider('volume', 0, 100, 1, new point_1.Point(0, 0), 500, 50);
            this.buttonLayer.addItem(this.volumeSlider);
        }
        clickHandler(point) {
            if (this.volumeSlider.isBounding(point)) {
                this.volumeSlider.clickHandler(point);
            }
        }
    }
    exports.SettingsScene = SettingsScene;
});
