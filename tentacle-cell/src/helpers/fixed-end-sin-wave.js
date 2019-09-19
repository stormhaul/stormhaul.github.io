"use strict";

var tc = tc || {};

/**
 * Generates a function which can output the displacement of a point along a line at a specific time.
 * @param amplitude {number} The maximum difference in displacement (eg the graph amplitude)
 * @param nodes {number} How many points the graph maintains a 0 amplitude at
 * @param oscillationSpeed {number} How quickly the displacement changes between amplitude extremes
 * @returns {function(number, number): number}
 */
tc.fixedEndSinWave = (amplitude, nodes, oscillationSpeed) => {
    /**
     * @param distance {number}
     * @param time {number}
     */
    return (distance, total, time) => {
        return amplitude * Math.sin(nodes * Math.PI * distance / total) * Math.cos(oscillationSpeed * Math.PI * time / 60);
    }
};