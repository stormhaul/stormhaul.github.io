define(["require", "exports", "../helpers/point"], function (require, exports, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mouse = void 0;
    class Mouse {
        constructor() {
            this.clickSubscribers = [];
            this.moveSubscribers = [];
            document.addEventListener('mousemove', this.dispatchMove.bind(this));
            document.addEventListener('click', this.dispatchClick.bind(this));
        }
        getMousePosition() {
            return this.mousePosition;
        }
        getClickPosition() {
            return this.clickPosition;
        }
        dispatchMove(e) {
            this.mousePosition = new point_1.Point(e.x, e.y);
            let toExecute = [];
            this.moveSubscribers.map(s => {
                if (s.active()) {
                    toExecute.push(s);
                }
            });
            toExecute.map(s => {
                s.execute();
            });
        }
        ;
        dispatchClick(e) {
            this.clickPosition = new point_1.Point(e.x, e.y);
            let toExecute = [];
            this.clickSubscribers.map(s => {
                if (s.active()) {
                    toExecute.push(s);
                }
            });
            toExecute.map(s => {
                s.execute();
            });
        }
        ;
        subscribe(event, sub) {
            switch (event) {
                case 'move':
                    this.moveSubscribers.push(sub);
                    break;
                case 'click':
                    this.clickSubscribers.push(sub);
                    break;
                default:
                    throw new Error('Unknown Event Subscription');
            }
        }
    }
    exports.Mouse = Mouse;
});