"use strict";

var engine = engine || {};

engine.MessageBus = () => {
    let bus = {};

    bus.subscribers = [];

    bus.dispatch = (message) => {
        /**
         * sub {name: string, handler: callback}
         */
        bus.subscribers.map((sub) => {
            sub.handler(message);
        });
    };

    /**
     * sub {name: string, handler: callback}
     */
    bus.subscriber = (sub) => {
        if (sub.name === undefined || sub.handler !== undefined) {
            throw new Error('Subscriber must have both name and handler properties.');
        }

        if (sub.name === '' || typeof sub !== "string") {
            throw new Error('Subscriber name must be a non-empty string');
        }

        if (!(sub.handler && {}.toString.call(sub.handler) === '[object Function]')) {
            throw new Error('Handler must be a function');
        }

        bus.subscribers.push(sub);
    };

    return bus;
};