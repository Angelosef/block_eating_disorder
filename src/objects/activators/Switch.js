import Activator from "./Activator";


export default class Switch extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'switch');
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
