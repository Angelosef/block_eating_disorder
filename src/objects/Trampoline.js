import StaticObject from "./StaticObject";
import Utils from "../utils";


export default class Trampoline extends StaticObject {
    constructor(scene, x, y, direction=Utils.directionEnum2['up']) {
        super(scene, x, y, 'trampoline');
        this.direction = direction;
        this.speed = 300;
    }

    static createFromTiledObject(scene, tiledObject) {
        const { x, y } = tiledObject;

        const props = {};
        if (Array.isArray(tiledObject.properties)) {
            for (const prop of tiledObject.properties) {
                props[prop.name] = prop.value;
            }
        }

        const direction = Utils.directionEnum2[props.direction];

        return new Trampoline(scene, x, y, direction);
    }

    clone() {
        const newTrampoline = new Trampoline(this.scene, 0, 0);
        newTrampoline.copy(this);
        return newTrampoline;
    }

    copy(trampoline) {
        super.copy(trampoline);
        this.direction = trampoline.direction;
        this.speed = trampoline.speed;
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
