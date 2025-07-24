import Phaser from 'phaser';

import Player from '../objects/Player.js';
import StaticBlock from '../objects/staticBlock.js';
import EdibleBlock from '../objects/edibleBlock.js';
import EdibleBlockManager from '../managers/EdibleBlockManager.js';
import InputManager from '../managers/InputManager.js';

export default class Playground extends Phaser.Scene {
  constructor() {
    super('playground');
  }

  preload() {
    this.load.image('player', 'assets/pngs/hungryMonster.png');
    this.load.image('staticBlock', 'assets/pngs/staticBlock.png');
    this.load.image('edibleBlock', 'assets/pngs/edibleBlock.png');
  }

  create() {
    this.InputManager = new InputManager(this, ['W', 'A', 'D', 'K', 'O']);
    const blockSize = 32;
    this.player = new Player(this, 100, 300);
    this.platforms = this.add.group();
    for (let x = 20; x < 800; x += blockSize+5) {
      const block = new StaticBlock(this, x, 500);
      this.platforms.add(block);
    }

    const jumpingBlock = new StaticBlock(this, 400, 400);
    const edibleBlock = new EdibleBlock(this, 300, 400);

    const edibleBlocks = [edibleBlock];
    this.edibleBlockManager = new EdibleBlockManager(this.player, edibleBlocks);

    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.platforms, jumpingBlock);
    this.physics.add.collider(this.player, jumpingBlock);
    this.physics.add.collider(this.platforms, edibleBlock);
    this.physics.add.collider(this.player, edibleBlock);
  }

  update() {
    this.InputManager.update();
    this.player.update(this.InputManager);
    this.edibleBlockManager.update(this.InputManager);
  }
  
  foo () {
    console.log("collision");
  }
}
