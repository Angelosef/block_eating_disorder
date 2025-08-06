import Utils from "../utils";

export default class InventoryManager {
    constructor(scene) {
        this.scene = scene;
        this.inputManager = scene.inputManager;
        this.edibleItems = [];
        this.inventory = [];
        this.maxInventorySize = 2;
    }

    addItem(item) {
        this.edibleItems.push(item);
    }

    eatBlock() {
        let removedIndices = [];
        for (let i=0;i<this.edibleItems.length;i++) {
            if (this.canEat(this.edibleItems[i])) {
                this.handleEatBlock(this.edibleItems[i]);
                removedIndices.push(i);
            }
        }
        for (let i = removedIndices.length - 1; i >= 0; i--) {
            this.edibleItems.splice(removedIndices[i], 1);
        }
    }

    handleEatBlock(block) {
        block.eaten();
        this.inventory.push(block);
    }

    spitOutBlock() {
        
        if (this.inventory.length > 0) {
            const lastBlock = this.inventory[this.inventory.length-1];
            const canSpitOut = lastBlock.canSpitOut();
            if(canSpitOut) {
                const oldBlock = this.inventory.pop();
                const newBlock = oldBlock.createBlock();
                newBlock.spitOut();
            }
        }
    }

    canEat(block) {
        const availablefoodSpace = this.inventory.length < this.maxInventorySize;
        return availablefoodSpace && this.facingCorrectDirection(block) && this.inEatingDistance(block);
    }

    facingCorrectDirection(block) {
        const blockPosition = Utils.getPosition(block.body);
        const playerPosition = Utils.getPosition(this.scene.player);
        const player = this.scene.player;

        const horizDifference = playerPosition.x - blockPosition.x;
        const leftOfFood = (horizDifference < 0) && (player.direction == Utils.directionEnum.right);
        const rightOfFood = (horizDifference > 0) && (player.direction == Utils.directionEnum.left);
        return (leftOfFood || rightOfFood);
    }

    inEatingDistance(block) {
        const blockPosition = block.body.center;
        const playerPosition = this.scene.player.body.center;
        const width = block.body.width;
        const height = block.body.height;
        
        const horizDistance = Math.abs(playerPosition.x - blockPosition.x);
        const verticalDistance = Math.abs(playerPosition.y - blockPosition.y);

        const isInEatingDistance = (horizDistance < width*1.5) && (verticalDistance < height*0.5);
       
        return isInEatingDistance;
    }

    update() {
        if(this.inputManager.justPressed('K')) {
            this.eatBlock();
        }
        else if (this.inputManager.justPressed('O')) {
            this.spitOutBlock();
        }
    }

    static removeDestroyedItems(array) {
        const removedIndices = [];
        for (let i=0;i<array.length;i++) {
            if (array[i].isDestroyed()) {
                removedIndices.push(i);
            }
        }
        for (let i = removedIndices.length - 1; i >= 0; i--) {
            array.splice(removedIndices, 1);
        }
    }

    cleanUp() {
        InventoryManager.removeDestroyedItems(this.edibleItems);
        InventoryManager.removeDestroyedItems(this.inventory);
    }

}
