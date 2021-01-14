import { Events, PanelTouchData } from "./Events";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelCreate extends cc.Component {
    @property({ type: cc.Node })
    optionPanels: cc.Node[] = []

    levelMap: LevelMap = null
    coord: cc.Vec2 = cc.Vec2.ZERO

    // onLoad () {}

    start() {

    }

    init(map: LevelMap) {
        this.levelMap = map
        this.optionPanels.forEach((panel: cc.Node) => panel.on(cc.Node.EventType.TOUCH_END, this.onPanelTouch, this))
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

    onPanelTouch(event: cc.Event.EventTouch) {
        const data: PanelTouchData = { towerName: event.target.name, coord: this.coord }
        this.node.emit(Events.PANEL_TOUCH, data)
    }

    // update (dt) {}
}
