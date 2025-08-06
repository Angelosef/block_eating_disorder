import Phaser from "phaser";

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureString='') {
        super(scene, x, y, textureString);
        this.textureString = textureString;
        this.scene.physics.add.existing(this);
    }

    initialize() {
        this.scene.add.existing(this);
        this.scene.gameObjectManager.add(this);
        this.destroyedFlag = false;
        this.inactiveFlag = false;
    }

    update() {}

    setActive(flag) {
        if (flag) {
            this.inactiveFlag = false;
            this.setVisible(true);
            this.enableBody();
        
        }
        else {
            this.inactiveFlag = true;
            this.disableBody(true, true);
        }
        
    }

    setDestroyedFlag() {
        this.destroyedFlag = true;
        this.inactiveFlag = true;
    }

    cleanUp() {
        if (this.destroyedFlag) {
            this.destroy();
        }
    }

    isDestroyed() {
        return this.destroyedFlag;
    }

    isInactive() {
        return this.inactiveFlag;
    }

    handleCollision(object) {
        if (object instanceof GameObject) {
            return true;
        }
        console.log("error: object isnt an instance of GameObject");
        return false;
    }

    clone() {
        const newGameObject = new GameObject(this.scene, 0, 0, '');
        newGameObject.copy(this);
        return newGameObject;
    }

    copy(gameObject) {
        this.copyBody(gameObject.body);
        this.destroyedFlag = gameObject.destroyedFlag;
        this.inactiveFlag = gameObject.inactiveFlag;
        this.textureString = gameObject.textureString;
    }

    copyBody(body) {
        const target = this.body;

        // Position
        target.x = body.x;
        target.y = body.y;

        // Velocity, acceleration, gravity, bounce (Vector2s)
        target.velocity.copy(body.velocity);
        target.acceleration.copy(body.acceleration);
        target.gravity.copy(body.gravity);
        target.bounce.copy(body.bounce);

        // Scalar properties
        target.mass = body.mass;
        target.immovable = body.immovable;
        target.allowGravity = body.allowGravity;
        target.allowDrag = body.allowDrag;
        target.allowRotation = body.allowRotation;
        target.maxVelocity.copy(body.maxVelocity);
        target.drag.copy(body.drag);

        // Collision flags
        target.blocked = { ...body.blocked };
        target.touching = { ...body.touching };
        target.wasTouching = { ...body.wasTouching };
        target.embedded = body.embedded;

        // Other physics state
        target.friction.copy(body.friction);
        target.angularVelocity = body.angularVelocity;
        target.angularAcceleration = body.angularAcceleration;
        target.angularDrag = body.angularDrag;
        target.rotation = body.rotation;
        target.moves = body.moves;
    }

}
