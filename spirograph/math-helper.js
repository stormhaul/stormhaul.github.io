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

    mathHelper.convertPolarCoordinate = (r, angle) => {
        return {
            x: r * Math.cos(angle),
            y: r * Math.sin(angle)
        };
    };

    mathHelper.getAngleFromCircumferenceAndArcLength = (circumference, arcLen) => {
        return arcLen * Math.PI / circumference;
    };

    mathHelper.areAnglesEquivalent = (a1, a2) => {
        a1 = mathHelper.r2d(a1);
        a2 = mathHelper.r2d(a2);

        let overflow = Math.floor(a1 / 360);
        a1 -= overflow * 360;
        overflow = Math.floor(a2 / 360);
        a2 -= overflow * 360;

        return Math.abs(a1 - a2) <= .1;
    };

    mathHelper.r2d = (a) => {
        return a * 180 / Math.PI
    };
    mathHelper.d2r = (a) => {
        return a * Math.PI / 180;
    };

    return mathHelper;
};