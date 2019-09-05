"use strict";

var vs = vs || {};

vs.mouseInput = () => {
    let ms = {};

    ms.leftPos = null;
    ms.rightPos = null;
    ms.mousePos = null;

    ms.leftDown = (pos) => {
        if (ms.leftPos !== null) {
            vs.impossibleMouseInputError('Double Left Down');
        }

        ms.leftPos = pos;
    };

    ms.leftUp = (pos) => {
        if (pos.dist(ms.leftPos) < USER_INPUT_MOUSE_CLICK_DISTANCE) {
            //dispatch click event
            console.log('left click');
        } else {
            //dispatch box event
            console.log('left box');
        }

        ms.leftPos = null;
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
            default:
                //ignored events
        }
    };

    document.addEventListener('mousedown', (e) => {ms.mouseEventHandler(e); return false;});
    document.addEventListener('mouseup', (e) => {ms.mouseEventHandler(e); return false;});
};
