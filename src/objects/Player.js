import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.keys = scene.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.body.setGravityY(200);
    this.directionEnum = {
      left: 0,
      right: 1,
      front: 2
    };
    this.direction = this.directionEnum.front;
  }

  update(inputManager) {
    if (inputManager.isDown('A')) {
      this.direction = this.directionEnum.left;
      this.setVelocityX(-160);
    }
    else if (inputManager.isDown('D')) {
      this.direction = this.directionEnum.right;
      this.setVelocityX(160);
    }
    else {
      //this.direction = this.directionEnum.front;
      this.setVelocityX(0);
    }

    if (inputManager.isDown('W') && this.body.touching.down)
      this.setVelocityY(-330);

  }

  
  
}
