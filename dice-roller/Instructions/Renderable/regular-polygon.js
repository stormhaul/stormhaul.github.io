"use strict";

define("Instructions/Renderable/RegularPolygon",
  ["CoordinateMath"],
  function() {

  }
);
class RegularPolygon extends CoordinateMath {
  constructor(pos, sides, length, fill = null, stroke = null) {
    if (sides < 3 || length < 3) {
      throw new Error('Invalid parameters for a RegularPolygon');
    }

    super();

    this.sides = sides;
    this.length = length;
    this.pos = pos;
    this.fill = fill;
    this.stroke = stroke;

    this.generateInstructions();
    console.log(this);
  }

  generateInstructions() {
    let interiorAngle = 180 * (this.sides - 2) / this.sides;
    let isocelesAngle = 180 - interiorAngle;

    this.vertices = [];
    let startAngle = 90;
    for (let i = 0; i < this.sides; i++) {
      this.vertices.push(
        this.getCoordFromStartRadiansLength(
          this.pos,
          this.convertD2R(startAngle + (i * isocelesAngle)),
          this.length
        )
      );
    }
  }
}
