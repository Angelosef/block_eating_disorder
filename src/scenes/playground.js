import Phaser from 'phaser';

import Player from '../objects/Player.js';
import StaticBlock from '../objects/blocks/StaticBlock.js';
import DynamicBlock from '../objects/blocks/DynamicBlock.js';
import InventoryManager from '../managers/InventoryManager.js';
import InputManager from '../managers/InputManager.js';
import CollisionManager from '../managers/CollisionManager.js';
import GameObjectManager from '../managers/GameObjectManager.js';
import Lava from '../objects/Lava.js';
import Flag from '../objects/Flag.js';
import MovingBlock from '../objects/blocks/MovingBlock.js';
import Button from '../objects/activators/button.js';
import Switch from '../objects/activators/Switch.js';
import ButtonTrigger from '../objects/activators/ButtonTrigger.js';
import SwitchTrigger from '../objects/activators/SwitchTrigger.js';

export default class Playground extends Phaser.Scene {
  constructor() {
    super('playground');
  }

  preload() {
    this.load.image('player', 'assets/pngs/hungryMonster.png');
    this.load.image('staticBlock', 'assets/pngs/staticBlock.png');
    this.load.image('edibleBlock', 'assets/pngs/edibleBlock.png');
    this.load.image('lava', 'assets/pngs/lava.png');
    this.load.image('flag', 'assets/pngs/flag.png');
    this.load.image('movingBlock', 'assets/pngs/movingBlock.png');
    this.load.image('button', 'assets/pngs/button.png');
    this.load.image('switch', 'assets/pngs/switch.png');
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
    new DynamicBlock(this, 150, 300);
    new DynamicBlock(this, 300, 400, 0, 2);
    new StaticBlock(this, 500, 400, 0, 3);

    new Lava(this, 600, 400);
    new Flag(this, 200, 300);
    const startingPoint = new Phaser.Math.Vector2(200, 200);
    const endingPoint = new Phaser.Math.Vector2(400, 200);
    new MovingBlock(this, startingPoint, endingPoint, 0, 'forward', 0.1);
    this.button = new Button(this, 100, 400);
    this.switch = new Switch(this, 50, 400);
    new ButtonTrigger(this, 100, 100, this.button);
    new SwitchTrigger(this, 50, 100, this.switch);
  }

  update() {
    this.inputManager.update();
    this.inventoryManager.update();
    this.gameObjectManager.update();
    
    this.inventoryManager.cleanUp();
    this.gameObjectManager.cleanUp();
  }
  
}
