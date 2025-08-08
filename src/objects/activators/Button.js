import Activator from "./Activator";


export default class Button extends Activator {
    constructor(scene, x, y) {
        super(scene, x, y, 'button');
    }

    static createFromTiledObject(scene, tiledObject) {
        const { x, y } = tiledObject;

        return new Button(scene, x, y);
    }

    clone() {
        const newButton = new Button(this.scene, 0, 0);
        newButton.copy(this);
        return newButton;
    }

}
