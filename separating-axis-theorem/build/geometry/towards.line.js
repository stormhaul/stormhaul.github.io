define(["require", "exports", "./line"], function (require, exports, line_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TowardsLine extends line_1.Line {
        constructor(start, direction, length) {
            let end = direction.clone();
            end.sub(start);
            end.unit();
            end.mult(length);
            end.add(start);
            super(start, end);
        }
    }
    exports.TowardsLine = TowardsLine;
});
