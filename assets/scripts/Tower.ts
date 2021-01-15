import Enemy from "./Enemy";
import Helpers from "./Helpers";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tower extends cc.Component {
    // @property
    reloadTime: number = 0.2

    coord: cc.Vec2
    targets: Enemy[] = []

    // onLoad () {}

    init(coord: cc.Vec2) {
        this.coord = coord

        this.schedule(() => this.fire(), this.reloadTime)
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

    fire() {
        const currentTarget: Enemy = this.getClosestTarget()
        if (currentTarget) {
            Helpers.rotateTo(this.node, currentTarget.node.getPosition(), 600, 90)
            cc.log(this.node.angle)
        }
    }

    getClosestTarget(): Enemy | null {
        return this.targets[0]  // TODO
    }

    // update (dt) {}
}
