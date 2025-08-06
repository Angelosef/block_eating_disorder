import StaticObject from "../StaticObject";


export default class ButtonTrigger extends StaticObject {
    constructor(scene, x, y, button) {
        super(scene, x, y, 'edibleBlock');
        this.button = button;
    }

    clone() {
        const newButtonTrigger = new ButtonTrigger(this.scene, 0, 0);
        newButtonTrigger.copy(this);
        return newButtonTrigger;
    }

    copy(buttonTrigger) {
        super.copy(buttonTrigger);
        this.button = buttonTrigger.button;
    }

    update() {
        if(this.button.eventTriggered()) {
            this.setActive(false);
        }
        else {
            this.setActive(true);
        }
        
    }
}
