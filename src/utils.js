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
}

