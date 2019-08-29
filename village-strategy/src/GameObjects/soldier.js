"use strict";

var vs = vs || {};

vs.soldier = (armyId, id, location) => {
    let soldier = {};

    soldier.armyId = armyId;
    soldier.id = id;
    soldier.pos = location;

    soldier.getPosition = () => {
        return soldier.pos;
    };

    soldier.render = (ctx) => {

    };

    return soldier;
};