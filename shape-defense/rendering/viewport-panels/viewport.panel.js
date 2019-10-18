"use strict";
exports.__esModule = true;
var conditional_subscriber_1 = require("../../user-input/conditional.subscriber");
var ViewportPanel = /** @class */ (function () {
    function ViewportPanel(mouse, offset, width, height, moveHandler, clickHandler) {
        var _this = this;
        this.layers = [];
        this.offset = offset;
        this.width = width;
        this.height = height;
        this.leftBound = offset.x;
        this.topBound = offset.y;
        this.rightBound = offset.x + width;
        this.botBound = offset.y + height;
        this.mouse = mouse;
        this.active = false;
        var moveSubscriber = new conditional_subscriber_1.ConditionalSubscriber(function () {
            return _this.active && _this.isBounding(_this.mouse.getMousePosition());
        }, function () {
            moveHandler(_this.mouse.getMousePosition());
        });
        var clickSubscriber = new conditional_subscriber_1.ConditionalSubscriber(function () {
            return _this.active && _this.isBounding(_this.mouse.getMousePosition());
        }, function () {
            clickHandler(_this.mouse.getMousePosition());
        });
        this.mouse.subscribe('move', moveSubscriber);
    }
    ViewportPanel.prototype.activate = function () {
        this.active = true;
    };
    ViewportPanel.prototype.deactivate = function () {
        this.active = false;
    };
    /**
     * This point must be a global point, not a local one.
     * @param p
     */
    ViewportPanel.prototype.isBounding = function (p) {
        return p.x >= this.leftBound && p.x < this.rightBound && p.y >= this.topBound && p.y < this.botBound;
    };
    /**
     * Reorders layers based on priority
     */
    ViewportPanel.prototype.prioritizeLayers = function () {
        this.layers.sort(function (a, b) { return a.getPriority() - b.getPriority(); });
    };
    /**
     * Add Layer to panel
     * @param layer
     */
    ViewportPanel.prototype.addLayer = function (layer) {
        this.layers.push(layer);
        this.prioritizeLayers();
    };
    /**
     * @param context
     */
    ViewportPanel.prototype.render = function (context) {
        this.layers.map(function (layer) {
            layer.render(context);
        });
    };
    ViewportPanel.prototype.getOffset = function () {
        return this.offset;
    };
    return ViewportPanel;
}());
exports.ViewportPanel = ViewportPanel;
