"use strict";

/**
 * @param id {int}
 * @returns {Event}
 * @constructor
 */
function EnemyEscapedEvent(id) {
    let e = new Event('enemy-escaped');
    e.data = {id: id};
    return e;
}
