import { Events, PanelTouchData } from "./Events";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelCreate extends cc.Component {
    @property(cc.Node)
    panel1: cc.Node = null
    @property(cc.Node)
    panel2: cc.Node = null

    levelMap: LevelMap = null
    coord: cc.Vec2 = cc.Vec2.ZERO

    // onLoad () {}

    start() {

    }

    init(map: LevelMap) {
        this.levelMap = map
        this.panel1.on(cc.Node.EventType.TOUCH_END, this.onPanelTouch, this)
        this.panel2.on(cc.Node.EventType.TOUCH_END, this.onPanelTouch, this)
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
