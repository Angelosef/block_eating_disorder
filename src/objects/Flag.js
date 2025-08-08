import StaticObject from "./StaticObject";


export default class Flag extends StaticObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'flag');
    }

    static createFromTiledObject(scene, tiledObject) {
        const { x, y } = tiledObject;
        return new Flag(scene, x, y);
    }

    clone() {
        const newFlag = new Flag(this.scene, 0, 0);
        newFlag.copy(this);
        return newFlag;
    }
}
