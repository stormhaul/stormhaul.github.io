define(["require", "exports", "../helpers/point", "../rendering/renderable.parent"], function (require, exports, point_1, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextElement extends renderable_parent_1.RenderableParent {
        constructor() {
            super();
            this.color = "black";
            this.fontFamily = "sans-serif";
            this.fontSize = 12;
            this.position = new point_1.Point(0, 0);
            this.maxWidth = -1;
        }
        getColor() {
            return this.color;
        }
        setColor(color) {
            this.color = color;
            return this;
        }
        getFontFamily() {
            return this.fontFamily;
        }
        setFontFamily(fontFamily) {
            this.fontFamily = fontFamily;
            return this;
        }
        getFontSize() {
            return this.fontSize;
        }
        setFontSize(fontSize) {
            this.fontSize = fontSize;
            return this;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
            return this;
        }
        getValue() {
            return this.value;
        }
        setValue(value) {
            this.value = value;
            return this;
        }
        getTextMetrics(context) {
            return context.measureText(this);
        }
        getMaxWidth() {
            return this.maxWidth === -1 ? null : this.maxWidth;
        }
        render(context, offset = new point_1.Point(0, 0)) {
            console.log("Text Element Render Called with: ", offset, this.position);
            context.text(this, offset);
        }
    }
    exports.TextElement = TextElement;
});
