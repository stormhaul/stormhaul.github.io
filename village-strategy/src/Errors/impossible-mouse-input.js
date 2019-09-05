"use strict";

var vs = vs || {};

vs.impossibleMouseInputError = (str) => {
    let e = new Error('Mouse Input Error: ' + str);

    throw e;
};