define(["require", "exports", "./scene", "../user-interface/slider", "../helpers/point", "./viewport-panels/layer", "./viewport-panels/viewport.panel", "../user-interface/backdrop", "../user-interface/text.element", "../user-interface/button"], function (require, exports, scene_1, slider_1, point_1, layer_1, viewport_panel_1, backdrop_1, text_element_1, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SettingsScene extends scene_1.Scene {
        constructor(mouse) {
            super(mouse);
            this.backgroundLayer = new layer_1.Layer();
            this.separatorLayer = new layer_1.Layer(1);
            this.textLayer = new layer_1.Layer(2);
            this.buttonLayer = new layer_1.Layer(3);
            this.panel = new viewport_panel_1.ViewportPanel(this.mouse, new point_1.Point(0, 0), window.innerWidth, window.innerHeight, this.moveHandler.bind(this), this.clickHandler.bind(this));
            this.addPanel(this.panel);
            this.panel.addLayer(this.backgroundLayer);
            this.panel.addLayer(this.separatorLayer);
            this.panel.addLayer(this.textLayer);
            this.panel.addLayer(this.buttonLayer);
            let backdropWidth = 600;
            let backdrop = new backdrop_1.Backdrop(new point_1.Point((window.innerWidth - backdropWidth) / 2, 0), backdropWidth, 500, '#333');
            backdrop.attachParent(this.panel);
            this.backgroundLayer.addItem(backdrop);
            let volumeLabel = new text_element_1.TextElement().setValue('Volume').setPosition(new point_1.Point(900, 25)).setColor('white');
            volumeLabel.attachParent(backdrop);
            this.textLayer.addItem(volumeLabel);
            this.volumeSlider = new slider_1.Slider('volume', 0, 100, 1, new point_1.Point(50, 50), 500, 50);
            this.volumeSlider.attachParent(backdrop);
            let backLabel = new text_element_1.TextElement().setValue('Back');
            this.backButton = new button_1.Button(new point_1.Point(225, 450), 150, 40, backLabel, new Event('menu.button.clicked'));
            this.backButton.attachParent(backdrop);
            this.buttonLayer.addItem(this.volumeSlider);
            this.buttonLayer.addItem(this.backButton);
        }
        moveHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.panel.getOffset());
            this.buttonHover(this.backButton, relativePos);
        }
        clickHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.panel.getOffset());
            if (this.volumeSlider.isBounding(position)) {
                this.volumeSlider.clickHandler(position);
            }
            this.buttonClick(this.backButton, relativePos);
        }
    }
    exports.SettingsScene = SettingsScene;
});
