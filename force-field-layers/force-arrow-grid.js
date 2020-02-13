var ffl = ffl || {};

ffl.forceArrowGrid = function (containerWidth, containerHeight, forces) {
    let fa = {};

    let cellDim = 20;

    let positions = [];
    for (let i = 0; i < containerWidth / cellDim; i++) {
        for (let j = 0; j < containerHeight / cellDim; j++) {
            positions.push(ffl.vector(
                i * cellDim + cellDim / 2,
                j * cellDim + cellDim / 2
            ));
        }
    }

    fa.positions = positions;
    fa.forces = forces;

    fa.maxArrowLength = cellDim;

    fa.deltaXRange = fa.forces.length * (ffl.config.forces.maxX - ffl.config.forces.minX);
    fa.deltaYRange = fa.forces.length * (ffl.config.forces.maxY - ffl.config.forces.minY);

    fa.render = (ctx) => {
        fa.positions.map((position) => {
            let sumForce = ffl.vector(0,0);
            forces.map(forceField => {
                sumForce = sumForce.add(forceField.getForceAt(position));
            });
            ctx.arrow(
                position,
                sumForce,
                fa.getArrowLength(sumForce),
                'blue'
            );
        });
    };

    fa.getArrowLength = (sumForce) => {
        let xPercent = (sumForce.x - ffl.config.forces.minX) / fa.deltaXRange;
        let yPercent = (sumForce.y - ffl.config.forces.minY) / fa.deltaYRange;

        return sumForce.unit().mult(fa.maxArrowLength).mult((xPercent + yPercent)).magnitude();
    };

    return fa;
};
