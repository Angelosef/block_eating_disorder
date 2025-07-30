import Activator from "./Activator";


export default class Button extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'button');
    }

    eventTriggered() {
        return this.isDown();
    }
}