"use strict";

class VectorMath {
  getVectorFromLengthRadians(length, radians) {
    let end = {};
    end.x = length * Math.cos(radians);
    end.y = length * Math.sin(radians);

    return end;
  }
}
