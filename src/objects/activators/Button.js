import Activator from "./Activator";


export default class Button extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'button');
    }

    clone() {
        const newButton = new Button(this.scene, 0, 0);
        newButton.copy(this);
        return newButton;
    }

    eventTriggered() {
        return this.isDown();
    }
}