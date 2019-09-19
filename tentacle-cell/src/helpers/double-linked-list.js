"use strict";

var tc = tc || {};

/**
 * Returns a doubly linked list object with the following methods:
 * @method add adds an item to  the list
 * @method remove removes and item to the list
 * @method forEach applies a function to every item in this list's data
 */
tc.doubleLinkedList = () => {
    let d = {};

    d.head = null;
    d.tail = null;

    d.isEmpty = () => {
        return d.head === null && d.tail === null;
    };

    d.hasOneItem = () => {
        return d.isEmpty() ? false : d.head.id === d.tail.id;
    };

    /**
     * Adds a new node with data.
     * @param data
     * @param reverse
     */
    d.add = (data, reverse = false) => {
        if (d.isEmpty()) {
            let n = tc.node(data);
            d.head = n;
            d.tail = n;

            return;
        }

        if (reverse) {
            d._addBackward(data);

            return;
        }

        d._addForward(data);
    };

    /**
     * Removes item from list returning any data stored within it.
     * If the list is empty it returns {undefined}.
     * @param reverse
     * @returns {*}
     */
    d.remove = (reverse = false) => {
        if (d.isEmpty()) {
            return undefined;
        }

        if (d.hasOneItem()) {
            let data = d.head.data;
            d.head = null;
            d.tail = null;

            return data;
        }

        if (reverse) {
            return d._removeBackward();
        }
        return d._removeForward();
    };

    /**
     * Iterates over list, performing callback function on the data of each.
     * @param callback function({*}, {number}) {*}
     */
    d.forEach = (callback) => {
        if (d.isEmpty()) {
            return;
        }

        let cur = d.head;
        let i = 0;
        while (cur !== null) {
            cur.data = callback(cur.data, i);
            cur = cur.next;
            i++;
        }
    };

    /**
     * Add as tail
     * @param data
     * @private
     */
    d._addBackward = (data) => {
        let n = tc.node(data, d.tail);
        d.tail.next = n;
        d.tail = n;
    };

    /**
     * Add as head
     * @param data
     * @private
     */
    d._addForward  = (data) => {
        let n = tc.node(data);
        n.next = d.head;
        d.head = n;
    };

    /**
     * Take from tail
     * @private
     */
    d._removeBackward = () => {
        let data = d.tail.data;
        d.tail = d.tail.previous;
        return data;
    };

    /**
     * Take from head
     * @private
     */
    d._removeForward = () => {
        let data = d.head.data;
        d.head = d.head.next;
        return data;
    };

    return d;
};

tc.node = (data, previous = null) => {
    let n = {};

    n.id = tc.uid();

    n.data = data;
    n.previous = previous;
    n.next = null;

    return n;
};
