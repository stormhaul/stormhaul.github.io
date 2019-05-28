"use strict";

function init() {
  let rp = new RegularPolygon({x:0, y:0}, 5, 15, 'blue', 'white');

  let r = new Renderer();
  console.log(r);
  r.drawRegularPolygon(rp);
}

init();
