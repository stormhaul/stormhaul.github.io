define(["require", "exports", "./scene", "../user-input/slider", "../helpers/point", "./viewport-panels/layer", "./viewport-panels/viewport.panel", "../user-input/backdrop", "../user-input/text.element"], function (require, exports, scene_1, slider_1, point_1, layer_1, viewport_panel_1, backdrop_1, text_element_1) {
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
            let backdropWidth = 600;
            let backdrop = new backdrop_1.Backdrop(new point_1.Point((window.innerWidth - backdropWidth) / 2, 0), backdropWidth, 500, '#333');
            this.backgroundLayer.addItem(backdrop);
            let volumeLabel = new text_element_1.TextElement().setValue('Volume').setPosition(new point_1.Point(900, 25)).setColor('white');
            volumeLabel.attachParent(backdrop);
            this.textLayer.addItem(volumeLabel);
            this.volumeSlider = new slider_1.Slider('volume', 0, 100, 1, new point_1.Point(50, 50), 500, 50);
            this.volumeSlider.attachParent(backdrop);
            this.buttonLayer.addItem(this.volumeSlider);
        }
        clickHandler(point) {
            if (!this.active) {
                return;
            }
            if (this.volumeSlider.isBounding(point)) {
                this.volumeSlider.clickHandler(point);
            }
        }
    }
    exports.SettingsScene = SettingsScene;
});
