"use strict";

class AngleMath {
  convertD2R (degrees) {
    return Math.PI * degrees / 180;
  }
  convertR2D (radians) {
    return 180 * radians / Math.PI;
  }
}
