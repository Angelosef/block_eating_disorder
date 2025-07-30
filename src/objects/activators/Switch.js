import Activator from "./Activator";


export default class Switch extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'switch');
    }

    eventTriggered() {
        return this.justPressed();
    }
}
