import GameObject from "./GameObject";
import StaticObject from "./StaticObject";

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
        this.scene.physics.world.separate(this, object);
    }

    dynamicObjectCollision(object) {
        this.scene.physics.world.separate(this, object);
    }
}
