"use strict";

var vs = vs || {};

vs.isFunction = (func) => {
    return func && {}.toString.call(func) === '[object Function]';
};
