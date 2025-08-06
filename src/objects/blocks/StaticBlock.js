import Utils from "../../utils";
import StaticObject from "../StaticObject";
import Phaser from "phaser";

export default class StaticBlock extends StaticObject {
    
    constructor(scene, x, y, timesEaten=0, maxTimesEaten=0) {
        super(scene, x, y, 'staticBlock');
        this.maxTimesEaten = maxTimesEaten;
        this.timesEaten = timesEaten;
        if (this.isEdible()) {
            scene.inventoryManager.addItem(this);
        }
    }

    clone() {
        const newStaticBlock = new StaticBlock(this.scene, 0, 0);
        newStaticBlock.copy(this);
        return newStaticBlock;
    }

    copy(staticBlock) {
        super.copy(staticBlock);
        this.maxTimesEaten = staticBlock.maxTimesEaten;
        this.timesEaten = staticBlock.timesEaten;
    }

    eaten() {
        this.setActive(false);
    }

    createBlock() {
        this.setDestroyedFlag();
        const newBlock = new StaticBlock(this.scene, 0, 0, this.timesEaten+1, this.maxTimesEaten);
        newBlock.initialize();
        return newBlock;
    }

    canSpitOut() {
        const pos = this.spitOutPosition();
        const width = this.body.width*0.9;
        const height = this.body.height*0.9;

        return this.haveAvailableSpace(pos, width, height);
    }

    haveAvailableSpace(position, width, height) {
        // First, check world boundaries.
        const worldBounds = this.scene.physics.world.bounds;
        const proposedX = position.x;
        const proposedY = position.y;

        const fitsHorizontally = (proposedX >= worldBounds.x) && (proposedX + width <= worldBounds.width);
        const fitsVertically = (proposedY >= worldBounds.y) && (proposedY + height <= worldBounds.height);

        if (!fitsHorizontally || !fitsVertically) {
            return false;
        }

        let hasOverlap = false;
        const tempRect = new Phaser.Geom.Rectangle(proposedX-width/2, proposedY-height/2, width, height);

        // Inside a Phaser Scene class
        const dynamicBodies = this.scene.physics.world.bodies.entries;
        for (const body of dynamicBodies) {
            if(StaticBlock.checkBodyOverlapWithRectangle(body, tempRect) && body.enable) {
                hasOverlap = true;
            }
        }

        const staticBodies = this.scene.physics.world.staticBodies.entries;

        for (const staticBody of staticBodies) {
            if(StaticBlock.checkBodyOverlapWithRectangle(staticBody, tempRect) && this.body.enable) {
                hasOverlap = true;
            }
        }

        return !hasOverlap;
    }

    // A function that checks for overlap between a given body and a rectangle.
    static checkBodyOverlapWithRectangle(body, rectangle) {
        // 1. Create a temporary rectangle from the body's properties.
        const bodyRectangle = new Phaser.Geom.Rectangle(
            body.x,
            body.y,
            body.width,
            body.height
        );

        // 2. Use the Intersects utility to check for overlap.
        const isOverlapping = Phaser.Geom.Intersects.RectangleToRectangle(
            bodyRectangle,
            rectangle
        );

        return isOverlapping;
    }

    spitOutPosition() {
        const playerPosition = this.scene.player.body.center;
        let offset = this.scene.player.body.width * 1.1;
        if(this.scene.player.direction == Utils.directionEnum.left) {
            offset = -1 * offset;
        }
        return new Phaser.Math.Vector2(playerPosition.x+offset, playerPosition.y);
    }

    spitOut() {
        const pos = this.spitOutPosition();
        this.setPosition(pos.x, pos.y);
    }

    isEdible() {
        return this.timesEaten < this.maxTimesEaten;
    }

}
