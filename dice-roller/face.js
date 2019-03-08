"using strict";

class Face {
  constructor(value, type) {
    this.value  = value;
    this.type = type;
  }

  /**
   * returns an object with instructions for this face's face type and value
   */
  getRendorInstructions() {
    switch(this.type) {
      case 'number': return _renderNumber();
      case 'pip': return _renderPip();
      case 'shape': return _renderShape();
      default: throw new Error('invalid face type: ' + this.type);
    }
  }

  renderNumber() {

  }
}
