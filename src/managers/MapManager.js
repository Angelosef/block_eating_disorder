import Balloon from "../objects/Balloon";
import DynamicBlock from "../objects/blocks/DynamicBlock";
import StaticBlock from "../objects/blocks/StaticBlock";
import Flag from "../objects/Flag";
import Lava from "../objects/Lava";
import Player from "../objects/Player";
import Trampoline from "../objects/trampoline";
import Button from "../objects/activators/Button";
import Switch from "../objects/activators/Switch";
import ButtonControlledBlock from "../objects/blocks/ButtonControlledBlock";
import SwitchControlledBlock from "../objects/blocks/SwitchControlledBlock";
import MovingBlock from "../objects/blocks/MovingBlock";

export default class MapManager {
    constructor(scene, jsonMap) {
        this.scene = scene;
        this.activators = {}; // id → activator object

        const objectLayer = jsonMap.getObjectLayer('Object Layer 1');
        if (objectLayer) {
            this.createActivators(objectLayer); // pass 1
            this.createReceivers(objectLayer);  // pass 2
            this.createOthers(objectLayer);     // pass 3 (optional)
        }
    }

    // ---------------------------
    // PASS 1: Activators (Buttons, Switches)
    // ---------------------------
    createActivators(objectLayer) {
        objectLayer.objects.forEach(tiledObject => {
            const type = tiledObject.type;

            if (type === 'Button' || type === 'Switch') {
                const newObject = (type === 'Button')
                    ? Button.createFromTiledObject(this.scene, tiledObject)
                    : Switch.createFromTiledObject(this.scene, tiledObject);

                newObject.initialize();

                // store by Tiled object ID
                this.activators[tiledObject.id] = newObject;
            }
        });
    }

    // ---------------------------
    // PASS 2: Receivers
    // ---------------------------
    createReceivers(objectLayer) {
        objectLayer.objects.forEach(tiledObject => {

            const type = tiledObject.type;
            if(type === 'ButtonControlledBlock' || type === 'SwitchControlledBlock') {
                const props = {};
                if (Array.isArray(tiledObject.properties)) {
                    tiledObject.properties.forEach(p => {
                        props[p.name] = p.value;
                    });
                }

                // property: comma-separated IDs of linked activators
                const activatorIds = props.linkedActivatorIds
                    .split(',')
                    .map(s => parseInt(s.trim(), 10))
                    .filter(id => !isNaN(id));

                // Map IDs to actual activator objects
                const linkedActivators = activatorIds
                    .map(id => this.activators[id])
                    .filter(obj => obj !== undefined);

                if (type === 'ButtonControlledBlock') {
                    ButtonControlledBlock.createFromTiledObject(
                        linkedActivators,
                        this.scene,
                        tiledObject
                    );
                }

                else if (type === 'SwitchControlledBlock') {
                    SwitchControlledBlock.createFromTiledObject(
                        linkedActivators,
                        this.scene,
                        tiledObject
                    );
                }
                
            }

        });
    }

    // ---------------------------
    // PASS 3: Everything else
    // ---------------------------
    createOthers(objectLayer) {
        objectLayer.objects.forEach(tiledObject => {
            const type = tiledObject.type;

            if (type === 'StaticBlock') {
                const obj = StaticBlock.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
            else if (type === 'Player') {
                const obj = Player.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
                this.scene.player = obj;
            }
            else if (type === 'Balloon') {
                const obj = Balloon.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
            else if (type === 'Flag') {
                const obj = Flag.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
            else if (type === 'Lava') {
                const obj = Lava.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
            else if (type === 'Trampoline') {
                const obj = Trampoline.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
            else if (type === 'DynamicBlock') {
                const obj = DynamicBlock.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }

            else if (type === 'MovingBlock') {
                const obj = MovingBlock.createFromTiledObject(this.scene, tiledObject);
                obj.initialize();
            }
        });
    }
}
