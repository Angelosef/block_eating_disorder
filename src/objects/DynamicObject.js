import GameObject from "./GameObject";
import StaticObject from "./StaticObject";
import Utils from "../utils";

export default class DynamicObject extends GameObject {
    constructor(scene, x, y, textureString='') {
        super(scene, x, y, textureString);
        scene.collisionManager.addDynamicObject(this);
        this.setCollideWorldBounds(true);
    }

    handleCollision(object) {
        if (object instanceof StaticObject) {
            this.staticObjectCollision(object);
        }
        else if (object instanceof DynamicObject) {
            this.dynamicObjectCollision(object);
        }
        else {
            super.handleCollision(object);
        }

    }

    staticObjectCollision(object) {
        Utils.staticCollides(this.body, object.body);
    }

    dynamicObjectCollision(object) {
        Utils.dynamicCollides(this.body, object.body);
    }
}

