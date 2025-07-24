import Phaser from "phaser";

export default class InputManager {
  constructor(scene, keys = ['W', 'A', 'D', 'K', 'O']) {
    this.scene = scene;

    // Phaser keyboard objects, e.g. this.keys['W']
    this.keys = {};
    for (const key of keys) {
      this.keys[key] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]);
    }

    // Track key state: current and previous frame
    this.keyState = {};
    for (const key of keys) {
      this.keyState[key] = {
        isDown: false,
        wasDownLastFrame: false
      };
    }
  }

  update() {
    for (const key in this.keys) {
      const isDownNow = this.keys[key].isDown;
      this.keyState[key].wasDownLastFrame = this.keyState[key].isDown;
      this.keyState[key].isDown = isDownNow;
    }
  }

  isDown(key) {
    return this.keyState[key]?.isDown || false;
  }

  justPressed(key) {
    const state = this.keyState[key];
    return state?.isDown && !state.wasDownLastFrame;
  }
}
