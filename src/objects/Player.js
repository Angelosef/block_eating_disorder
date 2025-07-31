
import DynamicObject from "./DynamicObject";
import Flag from "./Flag";
import Lava from "./Lava";
import Utils from "../utils";
import Activator from "./activators/Activator";
import Trampoline from "./trampoline";
import Balloon from "./Balloon";

export default class Player extends DynamicObject {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.inputManager = scene.inputManager;
    
    this.direction = Utils.directionEnum.right;
    this.isAlive = true;
    this.won = false;
    this.setDragX(2000);
    this.setMaxVelocity(160, 300);
  }

  update() {
    if (this.inputManager.isDown('A')) {
      this.direction = Utils.directionEnum.left;
      this.setAccelerationX(-500);
    }
    else if (this.inputManager.isDown('D')) {
      this.direction = Utils.directionEnum.right;
      this.setAccelerationX(500);
    }
    else {
      this.setAccelerationX(0);
    }

    if (this.inputManager.isDown('W') && this.body.touching.down)
      this.setVelocityY(-200);
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

      else {
        super.handleCollision(object);
      }
    }

    handleTrampolineCollision(trampoline) {
      let isHorizontal = trampoline.getDirection() == Utils.directionEnum.right;
      isHorizontal = isHorizontal || trampoline.getDirection() == Utils.directionEnum.left;
      if(isHorizontal) {
        console.log(trampoline.getAddedVelocity().x);
        this.body.setVelocityX(trampoline.getAddedVelocity().x);
      }
      else {
        this.body.setVelocityY(trampoline.getAddedVelocity().y);
      }
    }

}
