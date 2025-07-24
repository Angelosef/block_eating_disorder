import Utils from "../utils";

export default class EdibleBlockManager {
    constructor(player, edibleBlocks) {
        this.player = player;
        this.edibleBlocks = edibleBlocks;
        this.edibleBlockInventory = [];
        this.MAX_INVENTORY_SIZE = 2;
    }

    eatBlock() {
      for (const edibleBlock of this.edibleBlocks) {
          if (this.canEat(edibleBlock)) {
              this.handleEatBlock(edibleBlock);
            }
        }
    }

    handleEatBlock(edibleBlock) {
        edibleBlock.eaten();
        this.edibleBlockInventory.push(edibleBlock);
        console.log(this.edibleBlockInventory.length);
    }

    spitOutBlock() {
        if (this.edibleBlockInventory.length > 0) {
            const edibleBlock = this.edibleBlockInventory.pop();
            this.edibleBlocks.push(edibleBlock);
            const playerPosition = Utils.getPosition(this.player.body);
            let offset = 40;
            if(this.player.direction == this.player.directionEnum.left) {
                offset = -1 * offset;
            }

            edibleBlock.enableBody(true, playerPosition.x+offset, playerPosition.y, true, true);
            edibleBlock.setVelocityX(this.player.body.velocity.x);
            console.log(this.edibleBlockInventory.length);
        }
    }

    canEat(edibleBlock) {
        const availablefoodSpace = this.edibleBlockInventory.length < this.MAX_INVENTORY_SIZE;
        return availablefoodSpace && this.facingCorrectDirection(edibleBlock) && this.inEatingDistance(edibleBlock);
    }

    facingCorrectDirection(edibleBlock) {
        const blockPosition = Utils.getPosition(edibleBlock.body);
        const playerPosition = Utils.getPosition(this.player.body);

        const horizDifference = playerPosition.x - blockPosition.x;
        const leftOfFood = (horizDifference < 0) && (this.player.direction == this.player.directionEnum.right);
        const rightOfFood = (horizDifference > 0) && (this.player.direction == this.player.directionEnum.left);
        return (leftOfFood || rightOfFood);
    }

    inEatingDistance(edibleBlock) {
        const blockPosition = Utils.getPosition(edibleBlock.body);
        const playerPosition = Utils.getPosition(this.player.body);

        const horizDistance = Math.abs(playerPosition.x - blockPosition.x);
        const verticalDistance = Math.abs(playerPosition.y - blockPosition.y);

        const isInEatingDistance = (horizDistance < 60) && (verticalDistance < 5);
       
        return isInEatingDistance;
    }

    update(inputManager) {
        if(inputManager.justPressed('K')) {
            this.eatBlock();
        }
        else if (inputManager.justPressed('O')) {
            this.spitOutBlock();
        }
    }

}
