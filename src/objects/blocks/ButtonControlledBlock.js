import ButtonReceiver from "../receivers/ButtonReceiver";
import StaticBlock from "./StaticBlock";


export default class ButtonControlledBlock extends ButtonReceiver {
    constructor(linkedButtons, scene, x, y, startsActive=true) {
        super(scene.gameObjectManager, linkedButtons);
        this.startsActive = startsActive;
        this.staticBlock = new StaticBlock(scene, x, y, 0, 0);
        this.staticBlock.initialize();
        if(!this.startsActive) {
            this.staticBlock.setActive(false);
        }
    }

    static createFromTiledObject(linkedButtons, scene, tiledObject) {
        const { x, y } = tiledObject;

        const props = {};
        if (Array.isArray(tiledObject.properties)) {
            for (const prop of tiledObject.properties) {
                props[prop.name] = prop.value;
            }
        }

        const startsActive = props.startsActive;

        return new ButtonControlledBlock(linkedButtons, scene, x, y, startsActive);
    }

    handleButtonDown() {
        if(this.startsActive) {
            this.staticBlock.setActive(false);
        }
        else {
            this.staticBlock.setActive(true);
        }
    }

    handleButtonUp() {
        if(this.startsActive) {
            this.staticBlock.setActive(true);
        }
        else {
            this.staticBlock.setActive(false);
        }
    }


}