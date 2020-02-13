var ffl = ffl || {};

/**
 * Data Object used to represent a layer of force. Generated via ffl.forceGenerator and consumed in ffl.map when calculating
 * the change in velocity of a particle.
 *
 * @param containerWidth Number of pixels the field covers wide
 * @param containerHeight Number of pixels the field covers tall
 * @param containerPosition Origin of the field box
 * @param cellWidth Number of pixels per cell (determines cell count in x direction)
 * @param cellHeight Number of pixels per cell (determines cell count in y direction)
 * @param forceArray Array of forces to distribute over cells (vectors representing acceleration affects)
 */
ffl.forceField = function (
    containerWidth,
    containerHeight,
    containerPosition,
    cellWidth,
    cellHeight,
    forceArray
) {
    let ff = {};

    ff.width = containerWidth;
    ff.height = containerHeight;
    ff.origin = containerPosition;
    ff.cWidth = cellWidth;
    ff.cHeight = cellHeight;

    let cXCount = Math.ceil(ff.width / ff.cWidth);
    let cYCount = Math.ceil(ff.height / ff.cHeight);

    if (forceArray.length !== cXCount) {
        throw new Error('force array doesn\'t contain right rows');
    }

    forceArray.map((row) => {
        if (row.length !== cYCount) {
            throw new Error('row didn\'t contain right columns');
        }
    });

    ff.grid = forceArray;
    ff.getForceAt = (vector) => {
        let def = ffl.vector(0,0);
        if (!ff.isBounding(vector)) {
            return def;
        }

        let offset = vector.sub(ff.origin);
        let x = Math.floor(offset.x / ff.cWidth);
        let y = Math.floor(offset.y / ff.cHeight);

        if (!ff.grid[x] || !ff.grid[x][y]) {
            return def;
        }
        return ff.grid[x][y];
    };

    ff.isBounding = (vector) => {
        let top = ff.origin.y;
        let left = ff.origin.x;
        let bottom = ff.origin.y + ff.height;
        let right = ff.origin.x + ff.width;
        return vector.within(top, right, bottom, left);
    };

    return ff;
};
