"use strict";

var vs = vs || {};

vs.mouseInput = () => {
    let ms = {};

    ms.buttons = {};
    ms.leftPos = null;
    ms.rightPos = null;
    ms.mousePos = null;
    ms.clickSelector = vs.clickSelect();
    ms.boxSelector   = vs.boxSelect();
    ms.clickTargetor = vs.clickTarget();

    ms.leftDown = (pos) => {
        if (ms.leftPos !== null) {
            vs.impossibleMouseInputError('Double Left Down');
        }

        ms.leftPos = pos;
        ms.buttons[USER_INPUT_MOUSE_LEFT] = true;
    };

    ms.leftUp = (pos) => {
        if (pos.dist(ms.leftPos) < USER_INPUT_MOUSE_CLICK_DISTANCE) {
            //dispatch click event
            ms.clickSelector.select(pos);
        } else {
            //dispatch box event
            let p2 = vs.point(ms.leftPos.x, pos.y),
                p3 = vs.point(pos.x, ms.leftPos.y);

            ms.boxSelector.select(ms.leftPos, p2, p3, pos);
        }

        ms.leftPos = null;
        ms.buttons[USER_INPUT_MOUSE_LEFT] = false;
    };

    ms.rightDown = (pos) => {
        if (ms.rightPos !== null) {
            vs.impossibleMouseInputError('Double Right Down');
        }
    };

    ms.rightUp = (pos) => {
        if (pos.dist(ms.rightPos) < USER_INPUT_MOUSE_CLICK_DISTANCE) {
            //dispatch click event
            console.log('right click');
        }

        ms.rightPos = null;
    };

    ms.mouseMove = (pos) => {
        ms.mousePos = pos;
    };

    ms.mouseEventHandler = (e) => {
        let me = vs.mouseEvent(e);

        switch (me.getType()) {
            case 'mousedown':
                switch (me.getButton()) {
                    case USER_INPUT_MOUSE_LEFT:
                        ms.leftDown(me.getPosition());
                        break;
                    case USER_INPUT_MOUSE_RIGHT:
                        ms.rightDown(me.getPosition());
                        break;
                    default:
                        //ignored buttons;
                }
                break;
            case 'mouseup':
                switch (me.getButton()) {
                    case USER_INPUT_MOUSE_LEFT:
                        ms.leftUp(me.getPosition());
                        break;
                    case USER_INPUT_MOUSE_RIGHT:
                        ms.rightUp(me.getPosition());
                        break;
                    default:
                    //ignored buttons;
                }
                break;
            case 'mousemove':
                ms.mouseMove(me.getPosition());
                break;
            default:
                //ignored events
        }
    };

    /**
     * Adds subscribers for types of selection, requires callbacks for each type of selector
     */
    ms.makeSelectable = (click, box) => {
        ms.clickSelector.addSubscriber(click);
        ms.boxSelector.addSubscriber(box);
    };

    ms.makeTargetable = (click) => {
        ms.clickTargetor.addSubscriber(click);
    };

    document.addEventListener('mousedown', (e) => {ms.mouseEventHandler(e); return false;});
    document.addEventListener('mouseup', (e) => {ms.mouseEventHandler(e); return false;});
    document.addEventListener('mousemove', (e) => {ms.mouseEventHandler(e); return false;});

    return ms;
};
