import Level0 from './scenes/Level0.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade', arcade: { gravity: { y: 500 }, debug: true } },
  scene: [Level0]
};

new Phaser.Game(config);
