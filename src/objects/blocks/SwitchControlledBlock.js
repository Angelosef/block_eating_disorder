import SwitchReceiver from "../receivers/SwitchReceiver";
import StaticBlock from "./StaticBlock";


export default class SwitchControlledBlock extends SwitchReceiver {
    constructor(linkedSwitches, scene, x, y, startsActive=true) {
        super(scene.gameObjectManager, linkedSwitches);
        this.startsActive = startsActive;
        this.staticBlock = new StaticBlock(scene, x, y, 0, 0);
        this.staticBlock.initialize();
        if(!this.startsActive) {
            this.staticBlock.setActive(false);
        }
    }

    static createFromTiledObject(linkedSwitches, scene, tiledObject) {
        const { x, y } = tiledObject;

        const props = {};
        if (Array.isArray(tiledObject.properties)) {
            for (const prop of tiledObject.properties) {
                props[prop.name] = prop.value;
            }
        }

        const startsActive = props.startsActive;

        return new SwitchControlledBlock(linkedSwitches, scene, x, y, startsActive);
    }

    handlEventTriggered() {
        if(this.staticBlock.isInactive()) {
            this.staticBlock.setActive(true);
        }
        else {
            this.staticBlock.setActive(false);
        }
    }

}