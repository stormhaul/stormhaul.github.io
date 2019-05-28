"use strict";

class Die {
  // faces should follow {face_value: face_ct};
  constructor(faces = {}, face_ct = 6) {
    this.faces = [];
    if (faces == {}) {
      for (let i = 1; i <= face_ct; i++) {
        this.faces.push(i);
      }
    } else {
      for (let value in faces) {
        let count = faces[value];
        for (let i = 0; i < count; i++) {
          this.faces.push(value);
        }
      }
    }
  }
}
