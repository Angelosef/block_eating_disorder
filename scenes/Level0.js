import Player from '../objects/Player.js';
import { setupCollisions } from '../physics/collisions.js';

export default class Level0 extends Phaser.Scene {
  constructor() {
    super('Level0');
  }

  preload() {
    this.load.image('player', 'assets/pngs/player.png');
    this.load.image('ground', 'assets\\pngs\\tile.png');
  }

  create() {
    const player = new Player(this, 100, 300);
    const platforms = this.physics.add.staticGroup();
    for (let x = 0; x < 800; x += 32) {
      platforms.create(x, 568, 'ground').setOrigin(0, 0).refreshBody();
    }

    platforms.create(400, 500, 'ground');

    setupCollisions(this, player, [], platforms);

    this.player = player; // store for update
  }

  update() {
    this.player.update();
  }
}
