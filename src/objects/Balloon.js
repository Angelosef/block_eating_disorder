import DynamicObject from './DynamicObject';
import Trampoline from './trampoline';
import Utils from '../utils';
import StaticObject from './StaticObject';
import MovingBlock from './blocks/MovingBlock';

export default class Balloon extends DynamicObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'balloon');
        this.body.setAllowGravity(false);
        this.mass = 1;
        this.speed = 100;
    }

    clone() {
        const newBalloon = new Balloon(this.scene, 0, 0);
        newBalloon.copy(this);
        return newBalloon;
    }

    copy(balloon) {
        super.copy(balloon);
        this.speed = balloon.speed;
    }

    handleCollision(object) {
        if(object instanceof Trampoline) {
            const vel = object.getAddedVelocity();
            this.body.setVelocity(vel.x, vel.y);
        }
        else if(object instanceof MovingBlock) {
            this.movingObjectCollision(object);
        }
        else if (object instanceof DynamicObject) {
            this.movingObjectCollision(object);
            Utils.separate(this.body, object.body);
        }
        else if (object instanceof StaticObject) {
            Utils.separate(this.body, object.body);
            this.body.setVelocity(0, 0);
        }
        else {
            super.handleCollision(object);
        }
    }

    movingObjectCollision(object) {
        const objectVelocityX = object.body.velocity.x;
        const objectVelocityY = object.body.velocity.y;
        
        switch(Utils.collisionType(this.body, object.body)) {
            case Utils.directionEnum.left:
                if(objectVelocityX > 0) {
                    this.body.setVelocity(this.speed, 0);
                }
                else {
                    this.body.setVelocity(0, 0);
                }
                break;
            case Utils.directionEnum.right:
                if(objectVelocityX <= 0) {
                    this.body.setVelocity(-1*this.speed, 0);
                }
                else {
                    this.body.setVelocity(0, 0);
                }
                break;
            case Utils.directionEnum.up:
                if(objectVelocityY >= 0) {
                    this.body.setVelocity(0, this.speed);
                }
                else {
                    this.body.setVelocity(0, 0);
                }
                break;
            case Utils.directionEnum.down:
                if(objectVelocityY < 0) {
                    this.body.setVelocity(0, -1*this.speed);
                }
                else {
                    this.body.setVelocity(0, 0);
                }
                break;
        }
        
    }

}
