import { Events } from "./Events";
import Helpers from "./Helpers";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

// assigned in Tiled editor
type Target = {
    name: string,
    x: number,
    y: number,
}

@ccclass
export default class NewClass extends cc.Component {
    @property(LevelMap)
    levelMap: LevelMap = null
    @property
    speed: number = 150

    targets: Target[] = []
    currentTargetName: number = 0
    rotationSpeed: number = 9

    // onLoad () {}

    start() {
        this.targets = this.levelMap.pathGroup.getObjects()

        this.moveToNextTarget()
    }

    moveToNextTarget() {
        this.currentTargetName++
        const nextPos: cc.Vec2 = this.getCurrentTargetPos()

        if (!nextPos) {
            this.node.emit(Events.ENEMY_FINISH)
            this.node.destroy()
        } else {
            Helpers.rotateTo(this.node, nextPos, 300, 0)
            Helpers.moveTo(this.node, nextPos, this.speed).then(() => {
                this.moveToNextTarget()
            })
        }
    }

    getCurrentTarget(): Target {
        return this.targets.find((target: Target) => parseInt(target.name) === this.currentTargetName)
    }

    // exact position (pixels) of the center point in tile
    getCurrentTargetPos(): cc.Vec2 {
        const currentTarget: Target = this.getCurrentTarget()
        if (!currentTarget) return

        const tileCoord: cc.Vec2 = this.levelMap.getTileCoordByPos(currentTarget.x, currentTarget.y)
        const pos = this.levelMap.roadLayer.getPositionAt(tileCoord)

        // return center point
        return cc.v2(pos.x + this.levelMap.tileSize.width / 2, pos.y + this.levelMap.tileSize.height / 2)
    }

    update(dt) {
        // cc.log(this.node.angle)
    }
}
