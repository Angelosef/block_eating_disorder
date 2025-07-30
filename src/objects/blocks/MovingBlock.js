import Utils from "../../utils";
import StaticObject from "../StaticObject";

export default class MovingBlock extends StaticObject {
    constructor(scene, startPoint, endPoint, offset=0, direction='forward', speed=0.1) {
        const initialPosition = Utils.getLinePoint(startPoint, endPoint, offset);

        super(scene, initialPosition.x, initialPosition.y, 'movingBlock');
        this.body.moves = true;
        this.body.setAllowGravity(false);
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.direction = direction;
        this.speed = speed;
        this.positionParameter = offset;
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
        this.body.x = position.x;
        this.body.y = position.y;
    }

}
