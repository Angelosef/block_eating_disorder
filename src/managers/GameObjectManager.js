
export default class GameObjectManager {
    constructor() {
        this.gameObjects = [];
        this.receivers = [];
    }

    add(object) {
        this.gameObjects.push(object);
    }

    addReceiver(receiver) {
        this.receivers.push(receiver);
    } 

    update() {
        for(const gameObject of this.gameObjects) {
            gameObject.update();
        }
        //console.log(this.gameObjects.length);
        for(const receiver of this.receivers) {
            receiver.update();
        }
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