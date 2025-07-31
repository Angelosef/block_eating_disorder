import Phaser from "phaser";

export default class Utils {
    static getPosition(body) {
        return {x: body.x, y:body.y};
    }

    static getLinePoint(startPoint, endPoint, offset) {
        const lineDirection = endPoint.clone().subtract(startPoint);
        const startOffset = lineDirection.clone().scale(offset);
        const linePoint = startPoint.clone().add(startOffset);

        return linePoint;
    }

    static doNothing() {}

    static directionEnum = {
      left: 0,
      right: 1,
      up: 2,
      down: 3
    };

    static directionToVector(direction) {
        switch(direction) {
            case Utils.directionEnum.left:
                return new Phaser.Math.Vector2(-1, 0);
            case Utils.directionEnum.right:
                return new Phaser.Math.Vector2(1, 0);
            case Utils.directionEnum.up:
                return new Phaser.Math.Vector2(0, -1);
            case Utils.directionEnum.down:
                return new Phaser.Math.Vector2(0, 1);
            default:
                console.log("invalid direction argument");
        }
    }

    static sideOverlap(body1, body2, sideType) {
        switch(sideType) {
            case Utils.directionEnum.right:
                return Utils.rightSideOverlap(body1, body2);
            case Utils.directionEnum.left:
                return Utils.leftSideOverlap(body1, body2);
            case Utils.directionEnum.up:
                return Utils.upSideOverlap(body1, body2);
            case Utils.directionEnum.down:
                return Utils.downSideOverlap(body1, body2);
        }
    }

    static rightSideOverlap(body1, body2) {
        if(body1.left < body2.left && body2.left < body1.right) {
            const s1 = body1.top;
            const e1 = body1.bottom;
            const s2 = body2.top;
            const e2 = body2.bottom;
            return this.getOverlapLength(s1, e1, s2, e2);
        }
        else {
            return 0;
        }
    }

    static leftSideOverlap(body1, body2) {
        if(body2.left < body1.left && body1.left < body2.right) {
            const s1 = body1.top;
            const e1 = body1.bottom;
            const s2 = body2.top;
            const e2 = body2.bottom;
            return this.getOverlapLength(s1, e1, s2, e2);
        }
        else {
            return 0;
        }
    }

    static upSideOverlap(body1, body2) {
        
        if(body1.bottom > body2.bottom && body2.bottom > body1.top) {
            const s1 = body1.left;
            const e1 = body1.right;
            const s2 = body2.left;
            const e2 = body2.right;
            return this.getOverlapLength(s1, e1, s2, e2);
        }
        else {
            return 0;
        }
    }

    static downSideOverlap(body1, body2) {
        if(body2.bottom > body1.bottom && body1.bottom > body2.top) {
            const s1 = body1.left;
            const e1 = body1.right;
            const s2 = body2.left;
            const e2 = body2.right;
            return this.getOverlapLength(s1, e1, s2, e2);
        }
        else {
            return 0;
        }
    }

    static getOverlapLength(s1, e1, s2, e2) {
        // Ensure the intervals are valid
        if (s1 > e1 || s2 > e2) {
            throw new Error("Invalid interval: start should be <= end");
        }

        const overlapStart = Math.max(s1, s2);
        const overlapEnd = Math.min(e1, e2);

        // Return the length of the overlap, or 0 if there's none
        return Math.max(0, overlapEnd - overlapStart);
    }

}

