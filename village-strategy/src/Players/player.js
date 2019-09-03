"use strict";

var vs = vs || {};

vs.player = (id) => {
    let p = {};

    p.id = id;
    p.selected = [];
    p.villages = [];
    p.armies = [];

    return p;
};
