define(["require", "exports", "../rendering/renderable.parent", "../helpers/point"], function (require, exports, renderable_parent_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Frame extends renderable_parent_1.RenderableParent {
        constructor(position, width, height, color = null) {
            super();
            this.position = position;
            this.width = width;
            this.height = height;
            this.borderWidth = 3;
            this.borderColor = color !== null ? color : '#333';
        }
        log() {
            console.log(this.position, this.getParentOffset(), this.position.add(this.getParentOffset()));
        }
        render(context, offset = new point_1.Point(0, 0)) {
            context.rect(this.position.add(this.getParentOffset()), this.width, this.height, this.borderWidth, false, '', true, this.borderColor);
        }
    }
    exports.Frame = Frame;
});
