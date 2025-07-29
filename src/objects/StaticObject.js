import GameObject from "./GameObject";

export default class StaticObject extends GameObject {
    constructor(scene, x, y, textureString='') {
        super(scene, x, y, textureString);
        scene.collisionManager.addStaticObject(this);
        this.setImmovable(true);
        this.body.moves = false;
    }
}
