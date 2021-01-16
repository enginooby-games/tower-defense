import Bullet from "./Bullet";
import { Events } from "./Events";
import Game from "./Game";
import Helpers from "./Helpers";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

// assigned in Tiled editor, path object layer
type MovePoint = {
    name: string,
    x: number,
    y: number,
}

@ccclass
export default class NewClass extends cc.Component {
    // @property(LevelMap)
    levelMap: LevelMap = null
    @property(cc.Prefab)
    healthBarPrefab: cc.Prefab = null
    @property
    speed: number = 150
    // @property
    maxHealth: number = 5
    // @property
    damage: number = 2
    // @property
    coint: number = 10

    currentHealth: number
    healthProgressBar: cc.ProgressBar
    targets: MovePoint[] = [] // checkpoints
    currentMovePointName: number = 0
    rotationSpeed: number = 9

    // onLoad () {}

    init(map: LevelMap) {
        this.levelMap = map
        this.targets = this.levelMap.pathGroup.getObjects()
        this.currentHealth = this.maxHealth

        this.createHealthBar()
        this.moveToNextPoint()
    }

    createHealthBar() {
        const healthBarNode: cc.Node = cc.instantiate(this.healthBarPrefab)
        this.node.addChild(healthBarNode)
        // healthBarNode.setPosition(14, 0)
        healthBarNode.setContentSize(this.node.width, this.node.width / 5)

        this.healthProgressBar = healthBarNode.getComponent(cc.ProgressBar)
        this.healthProgressBar.totalLength = this.node.width
        this.healthProgressBar.progress = 1

        const barNode: cc.Node = healthBarNode.children[0]
        barNode.setContentSize(this.node.width, this.node.width / 5)
    }

    updateHealthBar(damage: number) {
        this.healthProgressBar.progress -= (damage / this.maxHealth)
    }

    start() {

    }

    moveToNextPoint() {
        this.currentMovePointName++
        const nextPos: cc.Vec2 = this.getCurrentPointPos()

        if (!nextPos) { // finish movement
            this.attack()
        } else {
            Helpers.rotateTo(this.node, nextPos, 300, 0)
            Helpers.moveTo(this.node, nextPos, this.speed).then(() => {
                this.moveToNextPoint()
            })
        }
    }

    attack() {
        // const event: cc.Event.EventCustom = new cc.Event.EventCustom(Events.ENEMY_ATTACK, true)
        // const data: EnemyAttackData = { damage: this.damage }
        // event.setUserData(data)
        // // use dispatchEvent() to delivery event to parents (Game)
        // this.node.dispatchEvent(event);

        Game.instance.getAttack(this.damage)
        this.node.destroy()
    }

    getCurrentPoint(): MovePoint {
        return this.targets.find((target: MovePoint) => parseInt(target.name) === this.currentMovePointName)
    }

    // exact position (pixels) of the center point in tile
    getCurrentPointPos(): cc.Vec2 {
        const currentTarget: MovePoint = this.getCurrentPoint()
        if (!currentTarget) return

        const tileCoord: cc.Vec2 = this.levelMap.getTileCoordByPos(currentTarget.x, currentTarget.y)
        const pos = this.levelMap.roadLayer.getPositionAt(tileCoord)

        // return center point
        return cc.v2(pos.x + this.levelMap.tileSize.width / 2, pos.y + this.levelMap.tileSize.height / 2)
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        const bullet: Bullet = other.node.getComponent(Bullet)
        if (bullet) {
            this.getShot(bullet.damage)
            bullet.node.destroy()
        }
    }

    getShot(damage: number) {
        this.currentHealth -= damage
        this.updateHealthBar(damage)

        if (this.currentHealth > 0) {
            Helpers.blink(this, cc.Color.RED)
        } else {
            this.die()
        }
    }

    die() {
        Game.instance.updateCoint(this.coint)
        this.node.destroy()
    }

    update(dt) {
    }
}
