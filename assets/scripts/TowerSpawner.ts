import { PanelTouchData } from "./Events";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TowerSpawner extends cc.Component {
    @property({ type: cc.Prefab })
    towerPrefabs: cc.Prefab[] = []

    levelMap: LevelMap = null
    towers: cc.Node[] = []
    
    // onLoad () {}

    init(map: LevelMap) {
        this.levelMap = map
    }

    start() {

    }

    createTower(data: PanelTouchData) {
        const prefab: cc.Prefab = this.towerPrefabs.find((towerPrefab: cc.Prefab) => towerPrefab.name === data.towerName)
        const pos: cc.Vec2 = this.levelMap.towersLayer.getPositionAt(data.coord)

        const tower: cc.Node = cc.instantiate(prefab)
        tower.setPosition(pos.x + this.levelMap.tileSize.width / 2, pos.y + this.levelMap.tileSize.height / 2)

        this.node.addChild(tower)
        this.towers.push(tower)
    }

    // update (dt) {}
}
