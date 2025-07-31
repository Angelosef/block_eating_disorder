import Utils from "../../utils";
import StaticObject from "../StaticObject";

export default class StaticBlock extends StaticObject {
    
    constructor(scene, x, y, timesEaten=0, maxTimesEaten=0) {
        super(scene, x, y, 'staticBlock');
        this.maxTimesEaten = maxTimesEaten;
        this.timesEaten = timesEaten;
        if (this.isEdible()) {
            scene.inventoryManager.addItem(this);
        }
    }

    eaten() {
        this.setActive(false);
    }

    createBlock() {
        this.setDestroyedFlag();
        return new StaticBlock(this.scene, 0, 0, this.timesEaten+1, this.maxTimesEaten);
    }

    spitOut() {
        const playerPosition = this.scene.player.body.center;
        let offset = this.scene.player.body.width * 1.1;
        if(this.scene.player.direction == Utils.directionEnum.left) {
            offset = -1 * offset;
        }
        this.setPosition(playerPosition.x+offset, playerPosition.y);
    }

    isEdible() {
        return this.timesEaten < this.maxTimesEaten;
    }

}
