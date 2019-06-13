"use strict";

/**
 * @param id {int}
 * @param goldValue {int}
 * @returns {Event}
 * @constructor
 */
function EnemyDiedEvent(id, goldValue) {
    let e = new Event('enemy-died');
    e.data = {id: id, gold: goldValue};
    return e;
}
