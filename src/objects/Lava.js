import StaticObject from "./StaticObject";

export default class Lava extends StaticObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'lava');
    }

    clone() {
        const newLava = new Lava(this.scene, 0, 0);
        newLava.copy(this);
        return newLava;
    }
}
