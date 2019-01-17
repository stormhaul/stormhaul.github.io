"using strict";

class UserInput {
  constructor (configuration) {
    this.vectors = {
      right: {x: configuration.step_size,      y: 0},
      left:  {x: -1 * configuration.step_size, y: 0},
      up:    {x: 0,                            y: -1 * configuration.step_size},
      down:  {x: 0,                            y: configuration.step_size}
    };

    this.keys = {
      down: [83, 40],
      up: [87, 38],
      right: [68, 39],
      left: [65, 37]
    };

    this.$canvas = document.getElementById(configuration.canvas_id);

    // default direction
    this.command = this.vectors.up;
    this.bindUserInputEvents();
  }

  bindUserInputEvents () {
    let that = this;
    console.log('binding');
    document.addEventListener('keydown', function (e) {
      for (let direction in that.keys) {
        if (that.keys[direction].indexOf(e.keyCode) !== -1 && !that.opposite(that.command, that.vectors[direction])) {
          that.command = that.vectors[direction];
        }
      }
    });
  }

  opposite (v1, v2) {
    let angle = Math.acos(this.dotProduct(v1,v2) / (this.magnitude(v1) * this.magnitude(v2)));
    return Math.round(angle * 180 / Math.PI) != 90
  }
  dotProduct (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
}
