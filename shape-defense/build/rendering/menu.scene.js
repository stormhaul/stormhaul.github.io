define(["require", "exports", "./scene", "./viewport-panels/layer", "./viewport-panels/viewport.panel", "../helpers/point", "../user-input/button", "../user-input/text.element"], function (require, exports, scene_1, layer_1, viewport_panel_1, point_1, button_1, text_element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MenuScene extends scene_1.Scene {
        constructor(mouse) {
            super(mouse);
            this.backgroundLayer = new layer_1.Layer();
            this.separatorLayer = new layer_1.Layer(1);
            this.textLayer = new layer_1.Layer(2);
            this.buttonLayer = new layer_1.Layer(3);
            this.panel = new viewport_panel_1.ViewportPanel(this.mouse, new point_1.Point(0, 0), window.innerWidth, window.innerHeight, this.moveHandler, this.clickHandler);
            this.addPanel(this.panel);
            this.panel.addLayer(this.backgroundLayer);
            this.panel.addLayer(this.separatorLayer);
            this.panel.addLayer(this.textLayer);
            this.panel.addLayer(this.buttonLayer);
            let settingsLabel = new text_element_1.TextElement().setValue('Settings');
            let settingsButton = new button_1.Button(new point_1.Point(10, 60), 150, 40, settingsLabel, new Event('settings.button.clicked'));
            let settingsId = this.buttonLayer.addItem(settingsButton);
            let testLabel = new text_element_1.TextElement().setValue('Test');
            let testButton = new button_1.Button(new point_1.Point(10, 110), 150, 40, testLabel, new Event('test.button.clicked'));
            let testId = this.buttonLayer.addItem(testButton);
            let startLabel = new text_element_1.TextElement().setValue('Start');
            let startButton = new button_1.Button(new point_1.Point(10, 10), 150, 40, startLabel, new Event('start.button.clicked'));
            let startId = this.buttonLayer.addItem(startButton);
            console.log(this.buttonLayer);
            this.startButton = startButton;
        }
        moveHandler(position) {
            let relativePos = position.sub(this.panel.getOffset());
            if (this.startButton.isBounding(relativePos)) {
                this.startButton.setHover(true);
            }
            else {
                this.startButton.setHover(false);
            }
        }
        clickHandler(position) {
            let relativePos = position.sub(this.panel.getOffset());
            if (this.startButton.isBounding(relativePos)) {
                this.startButton.trigger();
            }
        }
    }
    exports.MenuScene = MenuScene;
});
