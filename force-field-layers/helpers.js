var ffl = ffl || {};

ffl.helpers = {
    math: {
        rInt: (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
};
