var ffl = ffl || {};

ffl.vector = function (x, y) {
    let v = {};

    v.x = x;
    v.y = y;

    v.add = (vo) => {
        return ffl.vector(v.x + vo.x, v.y + vo.y);
    };

    v.mult = (c) => {
        return ffl.vector(v.x * c, v.y * c);
    };

    v.sub = (vo) => {
        return v.add(vo.mult(-1));
    };

    v.div = (c) => {
        if (c === 0) {
            throw new Error('Cannot Divide By 0');
        }

        return v.mult(1/c);
    };

    v.within = (top, right, bottom, left) => {
        return v.x >= left && v.x <= right && v.y >= top && v.y <= bottom;
    };

    v.magnitude = () => {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };

    v.unit = () => {
        let mag = v.magnitude();
        if (mag === 0) {
            return ffl.vector(0,0);
        }
        return ffl.vector(v.x / mag, v.y / mag);
    };

    v.along = (direction, length) => {
        return v
            .add(
                direction
                    .unit()
                    .mult(length)
            );
    };

    v.dist = (vo) => {
        return Math.sqrt(Math.pow(v.x - vo.x, 2) + Math.pow(v.y - vo.y, 2));
    };

    return v;
};