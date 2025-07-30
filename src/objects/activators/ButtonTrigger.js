import StaticObject from "../StaticObject";


export default class ButtonTrigger extends StaticObject {
    constructor(scene, x, y, button) {
        super(scene, x, y, 'edibleBlock');
        this.button = button;
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
