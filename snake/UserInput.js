"using strict";

class UserInput {
  constructor (configuration) {
    this.vectors = {
      right: {x:  1, y:  0},
      left:  {x: -1, y:  0},
      up:    {x:  0, y: -1},
      left:  {x:  0, y:  1}
    };

    this.keys = {
      up: [87, 38],
      right: [68, 39],
      down: [83, 40],
      left: [65, 37]
    };

    this.$canvas = document.getElementById(configuration.canvas_id);

    // default direction
    this.command = this.vectors.up;
  }

  bindUserInputEvents () {
    let that = this;
    for (let direction in this.keys) {
      this.$canvas.addEventListener('keydown', function (e) {
        if (that.keys[direction].indexOf(e.keyCode) !== -1) {
          that.command = that.vectors[direction];
        }
      });
    }
  }
}
