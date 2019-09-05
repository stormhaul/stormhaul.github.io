"use strict";

var vs = vs || {};

vs.callingNonFunctionError = () => {
    let e = new Error('Attempted to call a non function');

    throw e;
};