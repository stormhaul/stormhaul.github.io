"use strict";

let vs = vs || {};

vs.soldier = (armyId, id) => {
    let soldier = {};

    soldier.armyId = armyId;
    soldier.id = id;

    return soldier;
};