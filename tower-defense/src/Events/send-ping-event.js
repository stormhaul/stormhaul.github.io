"use strict";

/**
 * @param ping {Ping}
 * @returns {Event}
 * @constructor
 */
function SendPingEvent(ping) {
    let e = new Event('send-ping');
    e.data = {ping: ping};
    return e;
}
