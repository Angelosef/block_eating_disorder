
export default class CollisionManager {
    constructor(scene) {
        this.staticObjects = scene.add.group();
        this.dynamicObjects = scene.add.group();
        
        scene.physics.add.collider(this.staticObjects, this.dynamicObjects, this.handleCollision);
        scene.physics.add.collider(this.dynamicObjects, this.dynamicObjects, this.handleCollision);
    }

    addStaticObject(object) {
        this.staticObjects.add(object);
    }

    addDynamicObject(object) {
        this.dynamicObjects.add(object);
    }

    handleCollision(object1, object2) {
        const obj1 = object1;
        const obj2 = object2;
        object1.handleCollision(obj2);
        object2.handleCollision(obj1);
    }

}
