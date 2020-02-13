var ffl = ffl || {};

ffl.context = function () {
    let ctx = {};

    ctx.canvas        = document.getElementById(ffl.config.CANVAS_ID);
    ctx.canvas.width  = ffl.config.WIDTH;
    ctx.canvas.height = ffl.config.HEIGHT;
    ctx.twoD          = ctx.canvas.getContext('2d');

    ctx.clear = () => {
        ctx.twoD.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    ctx.circle = (center, radius, color) => {
        ctx.twoD.beginPath();
        ctx.twoD.fillStyle = color;
        ctx.twoD.arc(center.x, center.y, radius, 0, Math.PI*2);
        ctx.twoD.fill();
    };

    ctx.arrow = (center, direction, length, color) => {
        let start = center.along(direction.mult(-1), length/2)
        let end = center.along(direction, length/2);

        ctx.twoD.beginPath();
        ctx.twoD.strokeStyle = color;
        ctx.twoD.lineWidth = 1;
        ctx.twoD.moveTo(start.x, start.y);
        ctx.twoD.lineTo(end.x, end.y);
        ctx.twoD.stroke();

        ctx.circle(end, 2, color);
    };

    return ctx;
};
