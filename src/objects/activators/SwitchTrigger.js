import StaticObject from "../StaticObject";


export default class SwitchTrigger extends StaticObject {
    constructor(scene, x, y, switchObject) {
        super(scene, x, y, 'edibleBlock');
        this.switchObject = switchObject;
    }

    clone() {
        const newSwitchTrigger = new SwitchTrigger(this.scene, 0, 0);
        newSwitchTrigger.copy(this);
        return newSwitchTrigger;
    }

    copy(switchTrigger) {
        super.copy(switchTrigger);
        this.switchObject = switchTrigger.switchObject;
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
