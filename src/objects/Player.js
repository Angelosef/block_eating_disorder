
import DynamicObject from "./DynamicObject";
import Flag from "./Flag";
import Lava from "./Lava";
import Utils from "../utils";
import Activator from "./activators/Activator";
import Trampoline from "./trampoline";
import Balloon from "./Balloon";
import StaticObject from "./StaticObject";

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

  update() {
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
      const k2 = 5;
      const k3 = 30;
      const velocityX = this.body.velocity.x;

      let acceleration = inputForce;
      acceleration -= k2 * velocityX;
      if(Math.abs(velocityX) > 5) {
        acceleration -= k3 * Math.sign(velocityX);
      }
      
      this.setAccelerationX(acceleration);
    }

    handleCollision(object) {
      if (object instanceof Lava) {
        this.isAlive = false;
      }
      else if (object instanceof Flag) {
        this.won = true;
      }
      else if (object instanceof Balloon) {
        Utils.doNothing();
      }
      else if (object instanceof Trampoline) {
        this.handleTrampolineCollision(object);
      }
      else if (object instanceof Activator) {
        Utils.doNothing();
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

    collisionType(object) {
      const body1 = this.body;
      const body2 = object.body;

      const leftOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.left);
      const rightOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.right);
      const upOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.up);
      const downOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.down);

      const overlaps = [
          { dir: Utils.directionEnum.left, val: leftOverlap },
          { dir: Utils.directionEnum.right, val: rightOverlap },
          { dir: Utils.directionEnum.up, val: upOverlap },
          { dir: Utils.directionEnum.down, val: downOverlap }
      ];

      let maxOverlap = overlaps[0];
      for (let i = 0; i < overlaps.length; i++) {
          if (overlaps[i].val > maxOverlap.val) {
              maxOverlap = overlaps[i];
          }
      }
      return maxOverlap.dir;
    }

    checkJump(object) {
      if(!this.ableToJump) {
        this.ableToJump = Utils.isOnTopOf(this.body, object.body);
      }
      
    }

}
