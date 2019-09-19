"use strict";

var tc = tc || {};

tc.tentacle = (source, target, app) => {
    let t = {};

    t.id = tc.uid();
    t.source = source;
    t.target = target;

    t.segments = tc.doubleLinkedList();

    t.connected = false; // if tentacle is connected to something (cell or tentacle)
    t.versus = false; //if there is an enemy tentacle touching this tentacle

    t.addSegment = () => {

    };

    t.removeSegment = () => {

    };

    t.extend = () => {

    };

    t.retract = () => {

    };

    return t;
};
