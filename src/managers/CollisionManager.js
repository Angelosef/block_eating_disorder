
export default class CollisionManager {
    constructor(scene) {
        this.staticObjects = scene.add.group();
        this.dynamicObjects = scene.add.group();
        
        scene.physics.add.overlap(this.staticObjects, this.dynamicObjects, this.handleCollision);
        scene.physics.add.overlap(this.dynamicObjects, this.dynamicObjects, this.handleCollision);
    }

    addStaticObject(object) {
        this.staticObjects.add(object);
    }

    addDynamicObject(object) {
        this.dynamicObjects.add(object);
    }

    handleCollision(object1, object2) {
        const obj1 = object1.clone();
        const obj2 = object2.clone();

        object1.handleCollision(obj2);
        object2.handleCollision(obj1);
        
        obj1.destroy();
        obj2.destroy();
    }

}
