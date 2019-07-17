"use strict";

var spiro = spiro || {};

spiro.ellipseHelper = (mathHelper) => {
    let ellipseHelper = {};

    ellipseHelper.terms = parseInt(spiro.config['ellipse']['terms']);

    ellipseHelper.circumference = (a, b) => {
        let h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
        let circ = Math.PI * (a + b) * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)));

        return circ;
    };

    ellipseHelper.iterationsToRepeat = (outerCircumference, innerCircumference) => {
        let lcm = mathHelper.lcm(outerCircumference, innerCircumference);

        return Math.min(100, lcm / innerCircumference);
    };

    /**
     * @param a horizontal radius
     * @param b vertical radius
     * @param angle angle from horizontal radius
     * @returns {number}
     */
    ellipseHelper.getRadius = (a, b, angle) => {
        return a * b / Math.sqrt(Math.pow(a, 2) * Math.pow(Math.sin(angle), 2) + Math.pow(b, 2) * Math.pow(Math.cos(angle), 2));
    };

    return ellipseHelper;
};