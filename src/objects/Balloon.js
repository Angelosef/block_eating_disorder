import DynamicObject from './DynamicObject';
import Trampoline from './trampoline';
import Utils from '../utils';
import StaticObject from './StaticObject';
import MovingBlock from './blocks/MovingBlock';

export default class Balloon extends DynamicObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'balloon');
        this.body.setAllowGravity(false);
        this.speed = 100;
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
            this.scene.physics.world.collide(this, object);
        }
        else if (object instanceof StaticObject) {
            this.body.setVelocity(0, 0);
            this.scene.physics.world.collide(this, object);
        }
        else {
            super.handleCollision(object);
        }
    }

    movingObjectCollision(object) {
        const delta = this.scene.game.loop.delta;
        const dt = delta / 1000;
        const objectVelocityX = object.body.deltaX() / dt;
        const objectVelocityY = object.body.deltaY() / dt;
        
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
