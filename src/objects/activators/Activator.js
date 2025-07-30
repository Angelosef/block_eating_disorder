import StaticObject from '../StaticObject';
import DynamicObject from '../DynamicObject';

export default class Activator extends StaticObject {
    constructor(scene, x, y, textureString) {
        super(scene, x, y, textureString);
        this.framesSinceLastCollision = 2;
        this.pressed = false;
    }

    update() {
        this.framesSinceLastCollision = Math.min(this.framesSinceLastCollision+1, 3);
    }

    handleCollision(object) {
        if(object instanceof DynamicObject) {
            if(!this.isDown()) {
                this.pressed = true;
            }
            else {
                this.pressed = false;
            }
            this.framesSinceLastCollision = 0;
        }
        else {
            super.handleCollision(object);
        }
    }

    isDown() {
        return this.framesSinceLastCollision < 2;
    }

    justPressed() {
        return this.pressed;
    }
}
