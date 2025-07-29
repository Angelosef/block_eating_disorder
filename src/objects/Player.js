import DynamicObject from "./DynamicObject";

export default class Player extends DynamicObject {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.inputManager = scene.inputManager;
    this.directionEnum = {
      left: 0,
      right: 1,
      front: 2
    };
    this.direction = this.directionEnum.front;
  }

  update() {
    if (this.inputManager.isDown('A')) {
      this.direction = this.directionEnum.left;
      this.setVelocityX(-160);
    }
    else if (this.inputManager.isDown('D')) {
      this.direction = this.directionEnum.right;
      this.setVelocityX(160);
    }
    else {
      //this.direction = this.directionEnum.front;
      this.setVelocityX(0);
    }

    if (this.inputManager.isDown('W') && this.body.touching.down)
      this.setVelocityY(-200);
    }

}
