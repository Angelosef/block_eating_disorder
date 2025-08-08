import Phaser from 'phaser';
import Playground from './scenes/playground.js';

const width = 1000;
const height = 700;

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: true } },
  scene: [Playground]
};

new Phaser.Game(config);
