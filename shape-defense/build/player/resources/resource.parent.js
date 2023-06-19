define(["require", "exports", "../../rendering/renderable.parent", "../../helpers/point", "../../user-interface/text.element"], function (require, exports, renderable_parent_1, point_1, text_element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceParent = void 0;
    class ResourceParent extends renderable_parent_1.RenderableParent {
        constructor(position) {
            super();
            this.position = position;
            this.iconSize = 20;
        }
        render(context, offset) {
            context.rect(this.position.add(offset === undefined ? new point_1.Point(0, 0) : offset), 100, 40, 1, false, '', true, '#fff');
            this.renderIcon(context, this.position.add(new point_1.Point(5, 10)));
            let pad = '0'.repeat(Math.floor(Math.max(0, this.maximumDigits - Math.max(0, Math.log10(this.value)))));
            let strRep = pad + this.value;
            let resourceText = new text_element_1.TextElement();
            resourceText.setValue(strRep);
            resourceText.setColor('#fff');
            context.text(resourceText, this.position.add(new point_1.Point(40, 25)));
        }
    }
    exports.ResourceParent = ResourceParent;
});
