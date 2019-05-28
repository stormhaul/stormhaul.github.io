"use strict";

class LinkedList {
  constructor(configuration, collision_callback) {
    this.contains = {};
    this.head = null;
    this.tail = null;
    this._configuration = configuration

    this.collided = collision_callback;
  }

  addToHead (pos, ate = false) {
    if (this.head === null) {
      let n = new Node(pos);
      this.head = n;
      this.tail = n;
    } else {
      let temp = this.head;
      this.head = new Node(pos);
      this.head.next = temp;
      temp.prev = this.head;
    }

    if (this.contains[this.posToString(pos)] !== undefined || this.oob(pos)) {
      this.collided();
    }
    this.contains[this.posToString(pos)] = pos;

    if (!ate) {
      let prev = this.tail.prev;
      let remove_pos = this.tail.value;
      this.tail = prev;
      if (this.tail != null){
        this.tail.next = null;
      }
      delete this.contains[this.posToString(remove_pos)];
    }
  }

  oob (pos) {
    return pos.x < 0 || pos.y < 0 || pos.x >= this._configuration.width || pos.y >= this._configuration.height;
  }

  posToString (position) {
    return position.x + ',' + position.y;
  }

  stringToPos (str) {
    let arr = str.split(',');
    return {x:arr[0], y:arr[1]};
  }
}
