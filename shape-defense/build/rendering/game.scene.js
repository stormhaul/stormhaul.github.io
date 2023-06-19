define(["require", "exports", "./scene", "./viewport-panels/viewport.panel", "../helpers/point", "./viewport-panels/layer", "../user-interface/frame", "../user-interface/button", "../user-interface/text.element", "../maps/level.one", "../player/resources/gold", "../player/resources/lives"], function (require, exports, scene_1, viewport_panel_1, point_1, layer_1, frame_1, button_1, text_element_1, level_one_1, gold_1, lives_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameScene = void 0;
    class GameScene extends scene_1.Scene {
        constructor(mouse) {
            super(mouse);
            this.initializeLayers(mouse);
            this.menuButton = new button_1.Button(new point_1.Point(window.innerWidth - 42 - 3, 5), 40, 40, new text_element_1.TextElement().setValue('Menu'), new Event('menu.button.clicked'));
            this.menuButton.attachParent(this.topButtonLayer);
            this.topButtonLayer.addItem(this.menuButton);
            this.goldResource = new gold_1.Gold(new point_1.Point(5, 5), 500);
            this.goldResource.attachParent(this.topButtonLayer);
            this.topButtonLayer.addItem(this.goldResource);
            this.livesResource = new lives_1.Lives(new point_1.Point(105, 5), 20);
            this.livesResource.attachParent(this.topButtonLayer);
            this.topButtonLayer.addItem(this.livesResource);
        }
        initializeLayers(mouse) {
            let topbarHeight = 50;
            let rightbarWidth = 50;
            this.topBarPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(0, 0), window.innerWidth, topbarHeight, this.topBarMoveHandler.bind(this), this.topBarClickHandler.bind(this));
            this.topBackgroundLayer = new layer_1.Layer();
            this.topSeparatorLayer = new layer_1.Layer(9);
            this.topTextLayer = new layer_1.Layer(2);
            this.topButtonLayer = new layer_1.Layer(3);
            this.rightBarPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(window.innerWidth - rightbarWidth, topbarHeight), rightbarWidth, window.innerHeight - topbarHeight, () => {
            }, () => {
            });
            this.rightBackgroundLayer = new layer_1.Layer();
            this.rightSeparatorLayer = new layer_1.Layer(9);
            this.rightTextLayer = new layer_1.Layer(2);
            this.rightButtonLayer = new layer_1.Layer(3);
            this.mapPanel = new viewport_panel_1.ViewportPanel(mouse, new point_1.Point(0, topbarHeight), window.innerWidth - rightbarWidth, window.innerHeight - topbarHeight, () => {
            }, () => {
            });
            this.mapBackgroundLayer = new layer_1.Layer();
            this.mapSeparatorLayer = new layer_1.Layer(9);
            this.mapGameViewLayer = new layer_1.Layer(2);
            this
                .initializePanel(this.topBarPanel, [
                this.topBackgroundLayer,
                this.topSeparatorLayer,
                this.topTextLayer,
                this.topButtonLayer
            ])
                .initializePanel(this.rightBarPanel, [
                this.rightBackgroundLayer,
                this.rightSeparatorLayer,
                this.rightTextLayer,
                this.rightButtonLayer
            ])
                .initializePanel(this.mapPanel, [
                this.mapBackgroundLayer,
                this.mapSeparatorLayer,
                this.mapGameViewLayer
            ]);
            let topFrame = new frame_1.Frame(new point_1.Point(1.5, 1.5), window.innerWidth - 3, topbarHeight - 3);
            topFrame.attachParent(this.topBarPanel);
            this.topSeparatorLayer.addItem(topFrame);
            let rightFrame = new frame_1.Frame(new point_1.Point(1.5, 1.5), rightbarWidth - 3, window.innerHeight - topbarHeight - 3);
            rightFrame.attachParent(this.rightBarPanel);
            this.rightSeparatorLayer.addItem(rightFrame);
            let mapFrame = new frame_1.Frame(new point_1.Point(1.5, 1.5), window.innerWidth - rightbarWidth - 3, window.innerHeight - topbarHeight - 3, '#222');
            mapFrame.attachParent(this.mapPanel);
            this.mapSeparatorLayer.addItem(mapFrame);
            let level1 = new level_one_1.LevelOne(window.innerWidth - rightbarWidth, window.innerHeight - topbarHeight);
            level1.attachParent(this.mapPanel);
            this.topButtonLayer.addItem(level1);
            this.level1 = level1;
            return this;
        }
        initializePanel(panel, layers) {
            this.addPanel(panel);
            layers.map(layer => {
                panel.addLayer(layer);
            });
            return this;
        }
        topBarClickHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.topBarPanel.getOffset());
            this.buttonClick(this.menuButton, relativePos);
        }
        topBarMoveHandler(position) {
            if (!this.active) {
                return;
            }
            let relativePos = position.sub(this.topBarPanel.getOffset());
            this.buttonHover(this.menuButton, relativePos);
        }
        activate() {
            super.activate();
            this.level1.start();
        }
        deactivate() {
            super.deactivate();
            this.level1.stop();
        }
    }
    exports.GameScene = GameScene;
});
