import StaticObject from "../StaticObject";


export default class ButtonTrigger extends StaticObject {
    constructor(scene, x, y, switchObject) {
        super(scene, x, y, 'edibleBlock');
        this.switchObject = switchObject;
    }

    update() {
        if (this.switchObject.eventTriggered()) {
            if(this.isInactive()) {
                this.setActive(true);
            }
            else {
                this.setActive(false);
            }
        }
    }
}
