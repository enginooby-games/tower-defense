import Game from "./Game";
import LevelMap from "./LevelMap";
import Panel from "./Panel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelBuild extends cc.Component {
    levelMap: LevelMap = null
    coord: cc.Vec2 = cc.Vec2.ZERO

    init(map: LevelMap) {
        this.levelMap = map
        this.node.children.forEach((panelNode: cc.Node) => panelNode.on(cc.Node.EventType.TOUCH_END, (() => {
            const panel: Panel = panelNode.getComponent(Panel)
            if (Game.instance.coint >= panel.cost) {
                Game.instance.buildTower(panel.name, this.coord)
                Game.instance.updateCoint(-panel.cost)
            }
        }), this))
    }

    show(coord: cc.Vec2) {
        this.coord = coord
        const pos = this.levelMap.towersLayer.getPositionAt(this.coord)
        this.node.setPosition(pos.x + this.levelMap.tileSize.width / 2, pos.y + this.levelMap.tileSize.height / 2)
        this.node.active = true
    }

    hide() {
        this.node.active = false
    }

    // onPanelTouch(event: cc.Event.EventTouch) {
    //     // const data: BuildTowerData = { towerName: event.target.name, coord: this.coord }
    //     // this.node.emit(Events.BUILD_TOWER, data)
    //     Game.instance.buildTower(event.target.name, this.coord)
    // }
}
