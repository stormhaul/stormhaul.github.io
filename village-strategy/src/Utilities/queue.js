"use strict";

var vs = vs || {};
vs.util = vs.util || {};

vs.util.queue = () => {
    let queue = {};

    queue.head = null;
    queue.tail = null;

    queue.enqueue = (data) => {
        let n = vs.util.nodule(data);

        if (queue.tail !== null) {
            queue.tail.setNext(n);
            queue.tail = n;
        } else {
            queue.head = queue.tail = n;
        }
    };

    queue.dequeue = () => {
        if (queue.head === null) {
            return null;
        }

        let out = queue.head.getData();
        queue.head = queue.head.getNext();
        if (null === queue.head) {
            queue.tail = null;
        }

        return out;
    };

    return queue;
};