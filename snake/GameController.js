"using strict";

class GameController {
  constructor (configuration) {
    this._configuration = configuration;
  }

  loop () {
    let that = this;

    setTimeout(function () {
      console.log("called");
      that.loop();
    }, this._configuration.tick_delay);
  }
}
