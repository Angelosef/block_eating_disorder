import StaticObject from "./StaticObject";
import Utils from "../utils";


export default class Trampoline extends StaticObject {
    constructor(scene, x, y, direction=Utils.directionEnum.up) {
        super(scene, x, y, 'trampoline');
        this.direction = direction;
        this.speed = 300;
    }

    getDirection() {
        return this.direction;
    }

    getAddedSpeed() {
        return this.speed;
    }

    getAddedVelocity() {
        let unitVector = Utils.directionToVector(this.direction);
        unitVector.scale(this.speed);
        return unitVector;
    }
}
