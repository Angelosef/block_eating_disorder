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
    
  }

  update() {
    if (this.keys.a.isDown) this.setVelocityX(-160);
    else if (this.keys.d.isDown) this.setVelocityX(160);
    else this.setVelocityX(0);

    if (this.keys.w.isDown && this.body.touching.down)
      this.setVelocityY(-330);
  }
  
}
