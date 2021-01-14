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

    targets: Target[] = []
    currentTargetName: number

    // onLoad () {}

    start() {
        this.targets = this.levelMap.pathGroup.getObjects()

        this.currentTargetName = 2
        this.node.setPosition(this.getCurrentTargetPos())
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

    // update (dt) {}
}
