import Utils from "../../utils";

export default class SwitchReceiver {
    constructor(gameObjectManager, linkedSwitches) {
        this.linkedSwitches = linkedSwitches;
        gameObjectManager.addReceiver(this);
    }

    update() {
        for(const mySwitch of this.linkedSwitches) {
            if(mySwitch.eventTriggered()) {
                this.handlEventTriggered();
            }
        }
    }

    handlEventTriggered() {
        Utils.doNothing();
    }
}
