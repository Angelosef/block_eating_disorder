import Utils from "../../utils";
import StaticObject from "../StaticObject";
import Phaser from "phaser";

export default class MovingBlock extends StaticObject {
    constructor(scene, startPoint, endPoint, offset=0, direction='forward', speed=0.1) {
        const initialPosition = Utils.getLinePoint(startPoint, endPoint, offset);
        super(scene, initialPosition.x, initialPosition.y, 'movingBlock');
        this.body.moves = true;
        this.body.setAllowGravity(false);
        this.startPoint = startPoint.clone();
        this.endPoint = endPoint.clone();
        this.direction = direction;
        this.speed = speed;
        this.positionParameter = offset;
    }

    static createFromTiledObject(scene, tiledObject) {
        const { x, y, width, height} = tiledObject;
        const startPoint = new Phaser.Math.Vector2(
        x - width / 2,
        y - height / 2 // Tiled Y is at bottom of tile
        );

        const props = {};
        if (Array.isArray(tiledObject.properties)) {
            for (const prop of tiledObject.properties) {
                props[prop.name] = prop.value;
            }
        }

        const endPoint = new Phaser.Math.Vector2(
        props.end_x - width / 2,
        props.end_y - height / 2
        );
        const offset = props.offset;
        const direction = props.direction;
        const speed = props.speed;

        return new MovingBlock(scene, startPoint, endPoint, offset, direction, speed);
    }

    clone() {
        const zero = new Phaser.Math.Vector2(0, 0);
        const newMovingBlock = new MovingBlock(this.scene, zero, zero);
        newMovingBlock.copy(this);
        return newMovingBlock;
    }

    copy(movingBlock) {
        super.copy(movingBlock);
        this.startPoint = movingBlock.startPoint.clone();
        this.endPoint = movingBlock.endPoint.clone();
        this.direction = movingBlock.direction;
        this.speed = movingBlock.speed;
        this.positionParameter = movingBlock.offset;
    }

    update() {
        const delta = this.scene.game.loop.delta;
        const dt = delta / 1000;

        if(this.positionParameter < 1 && this.direction=='forward') {
            this.positionParameter += dt * this.speed;
        }
        else if (this.positionParameter >= 1 && this.direction=='forward') {
            this.direction = 'backwards';
        }
        else if (this.positionParameter > 0 && this.direction=='backwards') {
            this.positionParameter += -1 * dt * this.speed;
        }
        else if (this.positionParameter <= 0 && this.direction=='backwards') {
            this.direction = 'forward';
        }

        const position = Utils.getLinePoint(this.startPoint, this.endPoint, this.positionParameter);
        this.body.setVelocity((position.x-this.body.x)/dt, (position.y-this.body.y)/dt);
    }

}
