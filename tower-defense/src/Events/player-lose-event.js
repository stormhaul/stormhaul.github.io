"use strict";

/**
 * @returns {Event}
 * @constructor
 */
function PlayerLoseEvent() {
    let e = new Event('player-lose');
    return e;
}
