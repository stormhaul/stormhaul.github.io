"using strict";

class CoordinateMath extends AngleMath, VectorMath{
  getCoordFromStartRadiansLength(start, radians, length) {
    let vector = this.getVectorFromLengthRadians(length, radians);

    return {x: start.x + vector.x, y: start.y + vector.y};
  }
}
