import Phaser from 'phaser';

import InventoryManager from '../managers/InventoryManager.js';
import InputManager from '../managers/InputManager.js';
import CollisionManager from '../managers/CollisionManager.js';
import GameObjectManager from '../managers/GameObjectManager.js';
import MapManager from '../managers/MapManager.js';

export default class Playground extends Phaser.Scene {
  constructor() {
    super('playground');
  }

  preload() {
    this.load.tilemapTiledJSON('playground_map', 'assets/maps/level1.tmj');
    this.load.image('player', 'assets/pngs/hungryMonster.png');
    this.load.image('staticBlock', 'assets/pngs/staticBlock.png');
    this.load.image('edibleBlock', 'assets/pngs/edibleBlock.png');
    this.load.image('lava', 'assets/pngs/lava.png');
    this.load.image('flag', 'assets/pngs/flag.png');
    this.load.image('movingBlock', 'assets/pngs/movingBlock.png');
    this.load.image('button', 'assets/pngs/button.png');
    this.load.image('switch', 'assets/pngs/switch.png');
    this.load.image('trampoline', 'assets/pngs/trampoline.png');
    this.load.image('balloon', 'assets/pngs/balloon.png');
  }

  create() {
    this.inputManager = new InputManager(this, ['W', 'A', 'D', 'K', 'O']);
    this.collisionManager = new CollisionManager(this);
    this.inventoryManager = new InventoryManager(this);
    this.gameObjectManager = new GameObjectManager();

    const map = this.make.tilemap({ key: 'playground_map' });
    this.MapManager = new MapManager(this, map);
  }

  update() {

    this.inputManager.update();
    this.inventoryManager.update();
    this.gameObjectManager.update();
    
    this.inventoryManager.cleanUp();
    this.gameObjectManager.cleanUp();
  }
  
}
