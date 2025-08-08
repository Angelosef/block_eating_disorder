import Activator from "./Activator";


export default class Switch extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'switch');
    }

    static createFromTiledObject(scene, tiledObject) {
        const { x, y } = tiledObject;

        return new Switch(scene, x, y);
    }

    clone() {
        const newSwitch = new Switch(this.scene, 0, 0);
        newSwitch.copy(this);
        return newSwitch;
    }

    eventTriggered() {
        return this.justPressed();
    }
}
