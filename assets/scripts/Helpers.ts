export default class Helpers {
    /* MATH STUFFS */
    static getAngle(currentPos: cc.Vec2, targetPos: cc.Vec2): number {
        return Math.atan2(targetPos.y - currentPos.y, targetPos.x - currentPos.x) * 180 / Math.PI
    }

    static randomBetween(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }

    static randomIntBetween(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min))
    }

    static randomEnum<T>(anEnum: T): T[keyof T] {
        const enumValues = Object.keys(anEnum)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
        const randomIndex = Math.floor(Math.random() * enumValues.length)
        const randomEnumValue = enumValues[randomIndex]
        return randomEnumValue;
    }

    /* NODE OPERATIONS */
    static rotateTo(node: cc.Node, speed: number, targetPos: cc.Vec2) { // tween
        const finalAngle: number = Helpers.getAngle(node.getPosition(), targetPos)
        const angleDiff: number = Math.abs(finalAngle - node.angle)
        if (!angleDiff) return
        const duration: number = angleDiff / speed

        node.runAction(cc.rotateTo(duration, finalAngle))
    }

    static blink(component: cc.Component, color: cc.Color) {
        component.node.color = color

        component.scheduleOnce(function () {
            this.node.color = new cc.Color(255, 255, 255)
        }, 0.1);
    }

    static moveChildrentX(node: cc.Node, speed: number) { // update
        node.children.forEach((child: cc.Node) => child.x += speed)
    }

    // move a node which also contains childrent having rigid body component 
    static moveWithRigidChildrentX(node: cc.Node, speed: number) { // update
        node.x += speed
        // sync position for rigid-body child nodes
        node.children.forEach((child: cc.Node) => child.getComponent(cc.RigidBody)?.syncPosition(true))
    }

}