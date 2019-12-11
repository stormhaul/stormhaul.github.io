define(["require", "exports", "../rendering/renderable.parent", "../helpers/point"], function (require, exports, renderable_parent_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Backdrop extends renderable_parent_1.RenderableParent {
        constructor(position, width, height, backgroundColor) {
            super();
            this.position = position;
            this.width = width;
            this.height = height;
            this.backgroundColor = backgroundColor;
            this.padding = 10;
            this.margin = 10;
            this.borderWidth = 1;
            this.borderColor = '#eee';
        }
        setPadding(padding) {
            this.padding = padding;
            return this;
        }
        setMargin(margin) {
            this.margin = margin;
            return this;
        }
        setBorderWidth(borderWidth) {
            this.borderWidth = borderWidth;
            return this;
        }
        setBorderColor(borderColor) {
            this.borderColor = borderColor;
            return this;
        }
        getParentOffset() {
            let additionalOffset = this.padding + this.margin + this.borderWidth;
            return super.getParentOffset().add(new point_1.Point(additionalOffset, additionalOffset));
        }
        render(context, offset = new point_1.Point(0, 0)) {
            let additionalOffset = this.padding + this.margin;
            context.rect(this.position.add(new point_1.Point(additionalOffset, additionalOffset)), this.width, this.height, this.borderWidth, true, this.backgroundColor, true, this.borderColor);
            additionalOffset += 2 * this.borderWidth;
            context.rect(this.position.add(new point_1.Point(additionalOffset, additionalOffset)), this.width - 4 * this.borderWidth, this.height - 4 * this.borderWidth, this.borderWidth, true, this.backgroundColor, true, this.borderColor);
        }
    }
    exports.Backdrop = Backdrop;
});
