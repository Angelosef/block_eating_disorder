import Phaser from 'phaser';

export default class Block extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureString='box') {
        super(scene, x, y, textureString);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
