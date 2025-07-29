import Phaser from 'phaser';

import Player from '../objects/Player.js';
import StaticBlock from '../objects/blocks/StaticBlock.js';
import DynamicBlock from '../objects/blocks/DynamicBlock.js';
import InventoryManager from '../managers/InventoryManager.js';
import InputManager from '../managers/InputManager.js';
import CollisionManager from '../managers/CollisionManager.js';
import GameObjectManager from '../managers/GameObjectManager.js';

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
    this.inputManager = new InputManager(this, ['W', 'A', 'D', 'K', 'O']);
    this.collisionManager = new CollisionManager(this);
    this.inventoryManager = new InventoryManager(this);
    this.gameObjectManager = new GameObjectManager();

    
    this.player = new Player(this, 100, 300);
    const blockSize = 32;
    for (let x = 20; x < 800; x += blockSize+2) {
      new StaticBlock(this, x, 500);
    }

    new StaticBlock(this, 400, 400);
    new DynamicBlock(this, 300, 400, 0, 2);
  }

  update() {
    this.inputManager.update();
    this.inventoryManager.update();
    this.gameObjectManager.update();
    
    this.inventoryManager.cleanUp();
    this.gameObjectManager.cleanUp();
  }
  
}
