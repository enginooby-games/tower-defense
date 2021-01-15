import Enemy from "./Enemy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tower extends cc.Component {
    coord: cc.Vec2
    targets: Enemy[] = []

    // onLoad () {}

    init(coord: cc.Vec2) {
        this.coord = coord
    }

    start() {

    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        const enemy = other.node.getComponent(Enemy)
        if (enemy) {
            this.targets.push(enemy)
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider) {
        const enemy = other.node.getComponent(Enemy)
        if (enemy) {
            this.targets.splice(this.targets.indexOf(enemy), 1);
        }
    }
    // update (dt) {}
}
