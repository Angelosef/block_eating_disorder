import Utils from "../../utils";
import DynamicObject from "../DynamicObject";

export default class DynamicBlock extends DynamicObject {
    
    constructor(scene, x, y, timesEaten=0, maxTimesEaten=0) {
        super(scene, x, y, 'edibleBlock');
        this.maxTimesEaten = maxTimesEaten;
        this.timesEaten = timesEaten;
        if (this.isEdible()) {
            scene.inventoryManager.addItem(this);
        }
        this.setDrag(600, 0);
    }

    eaten() {
        this.setActive(false);
    }

    createBlock() {
        this.setDestroyedFlag();
        return new DynamicBlock(this.scene, 0, 0, this.timesEaten++, this.maxTimesEaten);
    }

    spitOut() {
        const playerPosition = Utils.getPosition(this.scene.player.body);
        let offset = 60;
        if(this.scene.player.direction == this.scene.player.directionEnum.left) {
            offset = -1 * offset;
        }
        this.setPosition(playerPosition.x+offset, playerPosition.y);
    }

    isEdible() {
        return this.timesEaten < this.maxTimesEaten;
    }

}
