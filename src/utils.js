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
        if(body2.left < body1.right && body1.right < body2.right) {
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
        if(body2.bottom > body1.top && body1.top > body2.top) {
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

    static collisionType(body1, body2) {
        return Utils.maxOverlap(body1, body2).dir;
    }

    static isOnTopOf(body1, body2) {
        //const downOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.down);
        let onTopOf = Utils.collisionType(body1, body2) == Utils.directionEnum.down;
        //onTopOf = onTopOf && (downOverlap > (body1.width*0.1));

        return onTopOf;
    }

    static collides(body1, body2) {
        if(body2.immovable) {
            Utils.staticCollides(body1, body2);
        }
        else {
            this.dynamicCollides(body1, body2);
        }
    }

    static allOverlaps(body1, body2) {
        const leftOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.left);
        const rightOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.right);
        const upOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.up);
        const downOverlap = Utils.sideOverlap(body1, body2, Utils.directionEnum.down);

        const overlaps = [
            { dir: Utils.directionEnum.left, val: leftOverlap },
            { dir: Utils.directionEnum.right, val: rightOverlap },
            { dir: Utils.directionEnum.up, val: upOverlap },
            { dir: Utils.directionEnum.down, val: downOverlap }
        ];
        return overlaps;
    }

    static maxOverlap(body1, body2) {
        const overlaps = this.allOverlaps(body1, body2);
        let maxOverlap = overlaps[0];
        for (let i = 0; i < overlaps.length; i++) {
            if (overlaps[i].val > maxOverlap.val) {
                maxOverlap = overlaps[i];
            }
        }
        return maxOverlap;
    }

    static getOverlapValue(overlaps, direction) {
        const overlapObject = overlaps.find(overlap => overlap.dir === direction);
        return overlapObject ? overlapObject.val : null;
    }

    static separate(body1, body2) {
        const collisionType = Utils.collisionType(body1, body2);

        if(collisionType == Utils.directionEnum.right) {
            const collisionDepth = body1.right - body2.left;
            body1.x += -1 * collisionDepth;
        }
        else if(collisionType == Utils.directionEnum.left) {
            const collisionDepth = body2.right - body1.left;
            body1.x += collisionDepth;
        }
        else if(collisionType == Utils.directionEnum.up) {
            const collisionDepth = body1.top - body2.bottom;
            body1.y -= collisionDepth;
        }
        else if(collisionType == Utils.directionEnum.down) {
            const collisionDepth = body2.top - body1.bottom;
            body1.y += collisionDepth;
        }
    }

    static staticCollides(body1, body2) {
        //body1 is dynamic, body2 is static
        //console.log("collision");
        const collisionThreshold = 2;
        const maxOverlap = Utils.maxOverlap(body1, body2).val;
        
        if(maxOverlap < collisionThreshold) {
            return;
        }
        const collisionType = Utils.collisionType(body1, body2);
        const horizontal = (collisionType == Utils.directionEnum.right) || (collisionType == Utils.directionEnum.left);
        const m1 = body1.mass;
        const m2 = body2.mass;
        const v1x = body1.velocity.x;
        const v1y = body1.velocity.y;
        const v2x = body2.velocity.x;
        const v2y = body2.velocity.y;

        Utils.separate(body1, body2);
        let validCollision = (collisionType == Utils.directionEnum.right) && (v1x > v2x);
        validCollision = validCollision || ((collisionType == Utils.directionEnum.left) && (v1x < v2x));
        validCollision = validCollision || ((collisionType == Utils.directionEnum.up) && (v1y < v2y));
        validCollision = validCollision || ((collisionType == Utils.directionEnum.down) && (v1y > v2y));

        if(horizontal && validCollision) {
            body1.velocity.x = Utils.oneDimElastic(m1, v1x, m2, v2x);
        }
        else if (validCollision) {
            body1.velocity.y = Utils.oneDimElastic(m1, v1y, m2, v2y);
        }
        Utils.simulateFriction(body1, body2, collisionType);

    }

    static dynamicCollides(body1, body2) {
        // both bodies are dynamic
        Utils.staticCollides(body1, body2);
    }

    static oneDimElastic(m1, v1, m2, v2) {
        // get the new velocity of m1after collision
        const coef1 = (m1 - m2) / (m1 + m2);
        const coef2 = 2 * m2 / (m1 + m2);
        return coef1 * v1 + coef2 * v2;
    }

    static simulateFriction(body1, body2, collisionType) {
        if(collisionType==Utils.directionEnum.down) {
            const frictionCoef = body1.friction.x * body2.friction.x;
            const v2 = body2.velocity.x;
            const v1 = body1.velocity.x;
            let dv = 0;
            if(Math.abs(v2-v1) > frictionCoef) {
                dv += 2 * frictionCoef * Math.sign(v2 - v1);
            }
            dv += 0.1 * frictionCoef * (v2 - v1);
            body1.velocity.x += dv;
        }
    }

}

