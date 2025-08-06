
export default class GameObjectManager {
    constructor() {
        this.gameObjects = [];
    }

    add(object) {
        this.gameObjects.push(object);
    }

    update() {
        for(const gameObject of this.gameObjects) {
            gameObject.update();
        }
        //console.log(this.gameObjects.length);
    }

    cleanUp() {
        const removedIndices = GameObjectManager.getRemovedIndices(this.gameObjects);

        for(const gameObject of this.gameObjects) {
            gameObject.cleanUp();
        }

        for (let i = removedIndices.length - 1; i >= 0; i--) {
            this.gameObjects.splice(removedIndices, 1);
        }
    }

    static getRemovedIndices(array) {
        const removedIndices = [];
        for (let i=0;i<array.length;i++) {
            if (array[i].isDestroyed()) {
                removedIndices.push(i);
            }
        }
        return removedIndices;
    }
}