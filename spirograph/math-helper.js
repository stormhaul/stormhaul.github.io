"use strict";

var spiro = spiro || {};

spiro.mathHelper = () => {
    let mathHelper = {};

    mathHelper.gcd = (a, b) => {
        if (a === 0) {
            return b;
        }
        return mathHelper.gcd(b % a, a);
    };

    mathHelper.lcm = (a, b) => {
        return (a * b) / mathHelper.gcd(a, b);
    };

    return mathHelper;
};