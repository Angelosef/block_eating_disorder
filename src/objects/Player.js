
import DynamicObject from "./DynamicObject";
import Flag from "./Flag";
import Lava from "./Lava";
import Utils from "../utils";
import Activator from "./activators/Activator";
import Trampoline from "./trampoline";
import Balloon from "./Balloon";
import StaticObject from "./StaticObject";
import DynamicBlock from "./blocks/DynamicBlock";

export default class Player extends DynamicObject {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.inputManager = scene.inputManager;
    
    this.direction = Utils.directionEnum.right;
    this.isAlive = true;
    this.won = false;
    this.movingForce = 500;
    this.ableToJump = false;
    this.setDragY(10);
  }

  static createFromTiledObject(scene, tiledObject) {
    const { x, y } = tiledObject;
    return new Player(scene, x, y);
  }

  clone() {
    const newPlayer = new Player(this.scene, 0, 0);
    newPlayer.copy(this);
    return newPlayer;
  }

  copy(player) {
    super.copy(player);
    this.direction = player.direction;
    this.isAlive = player.isAlive;
    this.won = player.won;
    this.movingForce = player.movingForce;
    this.ableToJump = player.ableToJump;
  }

  update() {
    //console.log("player velocity: ", this.body.velocity);
    if (this.inputManager.isDown('A')) {
      this.direction = Utils.directionEnum.left;
      this.moveHorizontally(-1 * this.movingForce);
    }
    else if (this.inputManager.isDown('D')) {
      this.direction = Utils.directionEnum.right;
      this.moveHorizontally(this.movingForce);
    }
    else {
      this.moveHorizontally(0);
    }

    if (this.inputManager.isDown('W') && this.ableToJump)
      this.setVelocityY(-200);

    this.ableToJump = false;
  }

    moveHorizontally(inputForce) {
      const k1 = 60;
      const k2 = 5;
      const velocityX = this.body.velocity.x;

      let acceleration = inputForce;
      if(!this.ableToJump) {
        acceleration -= k1 * Math.sign(velocityX);
        acceleration -= k2 * velocityX;
      }
      
      this.setAccelerationX(acceleration);
    }

    handleCollision(object) {
      if (object instanceof Lava) {
        console.log("died");
        this.isAlive = false;
      }
      else if (object instanceof Flag) {
        console.log("won");
        this.won = true;
      }
      else if (object instanceof Balloon) {
        super.handleCollision(object);
      }
      else if (object instanceof Trampoline) {
        this.handleTrampolineCollision(object);
      }
      else if (object instanceof Activator) {
        Utils.doNothing();
      }
      else if (object instanceof DynamicBlock) {
        this.checkJump(object);
        super.handleCollision(object);
      }
      else if (object instanceof StaticObject) {
        this.checkJump(object);
        super.staticObjectCollision(object);
      }
      else if (object instanceof DynamicObject) {
        this.checkJump(object);
        super.dynamicObjectCollision(object);
        
      }

      else {
        super.handleCollision(object);
      }
    }

    handleTrampolineCollision(trampoline) {
      let isHorizontal = trampoline.getDirection() == Utils.directionEnum.right;
      isHorizontal = isHorizontal || trampoline.getDirection() == Utils.directionEnum.left;
      if(isHorizontal) {
        this.body.setVelocityX(trampoline.getAddedVelocity().x);
      }
      else {
        this.body.setVelocityY(trampoline.getAddedVelocity().y);
      }
    }

    checkJump(object) {
      if(!this.ableToJump) {
        this.ableToJump = Utils.isOnTopOf(this.body, object.body);
      }
      
    }

}
