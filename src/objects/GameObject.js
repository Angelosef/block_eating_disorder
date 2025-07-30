import Phaser from "phaser";

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureString='') {
        super(scene, x, y, textureString);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.gameObjectManager.add(this);
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
        console.log("error");
        return false;
    }
}
