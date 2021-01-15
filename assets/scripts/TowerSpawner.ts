import { BuildTowerData } from "./Events";
import LevelMap from "./LevelMap";
import Tower from "./Tower";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TowerSpawner extends cc.Component {
    @property({ type: cc.Prefab })
    towerPrefabs: cc.Prefab[] = []

    levelMap: LevelMap = null
    towers: Tower[] = []

    // onLoad () {}

    init(map: LevelMap) {
        this.levelMap = map
    }

    start() {

    }

    createTower(data: BuildTowerData) {
        const prefab: cc.Prefab = this.towerPrefabs.find((towerPrefab: cc.Prefab) => towerPrefab.name === data.towerName)
        const pos: cc.Vec2 = this.levelMap.towersLayer.getPositionAt(data.coord)

        const towerNode: cc.Node = cc.instantiate(prefab)
        towerNode.setPosition(pos.x + this.levelMap.tileSize.width / 2, pos.y + this.levelMap.tileSize.height / 2)

        const tower: Tower = towerNode.getComponent(Tower)
        tower.init(data.coord)

        this.node.addChild(towerNode)
        this.towers.push(tower)
    }

    findTowerByCoord(coord: cc.Vec2): Tower {
        return this.towers.find((tower: Tower) =>
            tower.coord.x === coord.x && tower.coord.y === coord.y
        )
    }

    // update (dt) {}
}
