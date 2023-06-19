define(["require", "exports", "./scene", "./viewport-panels/layer", "./viewport-panels/viewport.panel", "../helpers/point", "../user-interface/button", "../user-interface/text.element", "../user-interface/backdrop"], function (require, exports, scene_1, layer_1, viewport_panel_1, point_1, button_1, text_element_1, backdrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuScene = void 0;
    class MenuScene extends scene_1.Scene {
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
            this.backgroundLayer.addItem(backdrop);
            let startLabel = new text_element_1.TextElement().setValue('Start');
            let startButton = new button_1.Button(new point_1.Point(225, 10), 150, 40, startLabel, new Event('game.button.clicked'));
            startButton.attachParent(backdrop);
            let startId = this.buttonLayer.addItem(startButton);
            let settingsLabel = new text_element_1.TextElement().setValue('Settings');
            let settingsButton = new button_1.Button(new point_1.Point(225, 60), 150, 40, settingsLabel, new Event('settings.button.clicked'));
            settingsButton.attachParent(backdrop);
            let settingsId = this.buttonLayer.addItem(settingsButton);
            this.startButton = startButton;
            this.settingsButton = settingsButton;
        }
        moveHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.panel.getOffset());
            this.buttonHover(this.startButton, relativePos);
            this.buttonHover(this.settingsButton, relativePos);
        }
        clickHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.panel.getOffset());
            this.buttonClick(this.startButton, relativePos);
            this.buttonClick(this.settingsButton, relativePos);
        }
    }
    exports.MenuScene = MenuScene;
});