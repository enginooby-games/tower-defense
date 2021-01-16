import Bullet from "./Bullet";
import Enemy from "./Enemy";
import Helpers from "./Helpers";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tower extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null
    // @property
    reloadTime: number = 0.7

    coord: cc.Vec2
    targets: Enemy[] = []

    // onLoad () {}

    init(coord: cc.Vec2) {
        this.coord = coord

        this.schedule(() => this.shoot(), this.reloadTime)
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

    shoot() {
        const currentTarget: Enemy = this.getClosestTarget()
        if (currentTarget) {
            const targetPos: cc.Vec2 = currentTarget.node.getPosition()
            Helpers.rotateTo(this.node, targetPos, 800, 90).then(() => {
                this.createBullet(targetPos)
            })
        }
    }
    createBullet(targetPos: cc.Vec2) {
        const bulletNode: cc.Node = cc.instantiate(this.bulletPrefab)
        bulletNode.angle = this.node.angle - 180 // angle offset of the sprite frame
        bulletNode.position = this.node.position
        this.node.parent.addChild(bulletNode)

        bulletNode.getComponent(Bullet).init(targetPos)
    }

    getClosestTarget(): Enemy | null {
        return this.targets[0]  // TODO
    }

    // update (dt) {}
}
