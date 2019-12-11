define(["require", "exports", "../helpers/point", "../rendering/renderable.parent"], function (require, exports, point_1, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Button extends renderable_parent_1.RenderableParent {
        constructor(position, width, height, label, event) {
            super();
            this.position = position;
            this.width = width;
            this.height = height;
            this.label = label;
            this.event = event;
            this.borderWidth = 1;
            this.backgroundColor = '#777';
            this.borderColor = '#eee';
            this.textColor = '#fff';
            this.hoverBackgroundColor = '#eee';
            this.hoverBorderColor = '#777';
            this.hoverTextColor = '#000';
            this.isHovered = false;
            this.alignment = 'center';
        }
        trigger() {
            document.dispatchEvent(this.event);
        }
        render(context) {
            context.rect(this.position, this.width, this.height, this.borderWidth, true, this.getBackgroundColor(), true, this.getBorderColor());
            this.setLabelAlignmentPostion(context);
            this.label.setColor(this.getTextColor());
            this.label.render(context, this.getParentOffset());
        }
        setLabelAlignmentPostion(context) {
            let metrics = context.measureText(this.label);
            let textHeight = metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent;
            let heightOffset = (this.height - textHeight) / 2 + textHeight;
            switch (this.alignment) {
                case 'left':
                    this.label.setPosition(new point_1.Point(0, heightOffset));
                    break;
                case 'center':
                    this.label.setPosition(new point_1.Point((this.width - metrics.width) / 2, heightOffset));
                    break;
                case 'right':
                    this.label.setPosition(new point_1.Point(this.width - metrics.width, heightOffset));
                    break;
                default:
                    throw new Error('Invalid Alignment for label');
            }
        }
        getBackgroundColor() {
            return this.isHovered ? this.hoverBackgroundColor : this.backgroundColor;
        }
        getBorderColor() {
            return this.isHovered ? this.hoverBorderColor : this.borderColor;
        }
        getTextColor() {
            return this.isHovered ? this.hoverTextColor : this.textColor;
        }
        setHover(hovered) {
            this.isHovered = hovered;
        }
        isBounding(point) {
            return point.x >= this.position.x && point.x < (this.position.x + this.width) && point.y >= this.position.y && point.y <= (this.position.y + this.height);
        }
    }
    exports.Button = Button;
});
//# sourceMappingURL=button.js.map