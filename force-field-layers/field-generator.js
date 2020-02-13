var ffl = ffl || {};

ffl.fieldGenerator = function (
    origin,
    width,
    height
) {
    let fg = {};

    fg.origin = origin;
    fg.width = width;
    fg.height = height;

    fg.generate = (rows, cols) => {
        let w = fg.width / rows;
        let h = fg.height / cols;
        let arr = [];
        for (let i = 0; i < rows; i++) {
            arr.push([]);
            for (let j = 0; j < cols; j++) {
                arr[i].push(
                    ffl.vector(
                        ffl.helpers.math.rInt(ffl.config.forces.minX, ffl.config.forces.maxX),
                        ffl.helpers.math.rInt(ffl.config.forces.minY, ffl.config.forces.maxY)
                    )
                );
            }
        }
        return ffl.forceField(fg.width, fg.height, fg.origin, w, h, arr);

    };

    fg.generateSpiral = (rows = 10, cols = 10) => {
        let w = fg.width / rows;
        let h = fg.height / cols;

        let d = ffl.vector(0, 1);
        let u = ffl.vector(0, -1);
        let l = ffl.vector(-1, 0);
        let r = ffl.vector(1, 0);
        let arr = [
            [d, d, d, d, d, d, d, d, d, r], // 0
            [l, d, d, d, d, d, d, d, r, r], // 1
            [l, l, d, d, d, d, d, r, r, r], // 2
            [l, l, l, d, d, d, r, r, r, r], // 3
            [l, l, l, l, d, r, r, r, r, r], // 4
            [l, l, l, l, l, u, r, r, r, r], // 5
            [l, l, l, l, u, u, u, r, r, r], // 6
            [l, l, l, u, u, u, u, u, r, r], // 7
            [l, l, u, u, u, u, u, u, u, r], // 8
            [l, u, u, u, u, u, u, u, u, u], // 9
        ];
        return ffl.forceField(fg.width, fg.height, fg.origin, w, h, arr);
    };

    return fg;
};
