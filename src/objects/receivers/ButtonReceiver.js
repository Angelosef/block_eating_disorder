import Utils from "../../utils";

export default class ButtonReceiver {
    constructor(gameObjectManager, linkedButtons) {
        this.linkedButtons = linkedButtons;
        gameObjectManager.addReceiver(this);
    }

    update() {
        for(const button of this.linkedButtons) {
            if(button.isDown()) {
                this.handleButtonDown();
            }
            else {
                this.handleButtonUp();
            }
        }
    }

    handleButtonDown() {
        Utils.doNothing();
    }

    handleButtonUp() {
        Utils.doNothing();
    }

}
