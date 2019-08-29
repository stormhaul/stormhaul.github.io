"use strict";

var vs = vs || {};
vs.util = vs.util || {};

vs.util.nodule = (data) => {
    let node = {};

    node.data = data;
    node.next = null;

    node.setNext = (next) => {
        node.next = next;
    };

    node.getData = () => {
        return node.data;
    };

    node.getNext = () => {
        return node.next;
    };

    return node;
};