import { Events, PanelTouchData } from "./Events";
import LevelMap from "./LevelMap";
import PanelCreate from "./PanelCreate";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(LevelMap)
    levelMap: LevelMap = null
    @property(PanelCreate)
    panelCreate: PanelCreate = null

    onLoad() {
        this.init()
        this.setEvents()
    }

    init() {
        this.levelMap.init()
        this.panelCreate.init(this.levelMap)
    }

    setEvents() {
        this.levelMap.node.on(cc.Node.EventType.TOUCH_END, this.onMapTouch, this)
        this.panelCreate.node.on(Events.PANEL_TOUCH, this.createTower, this)
    }

    createTower(data: PanelTouchData) {

    }

    onMapTouch(event: cc.Event.EventTouch) {
        this.panelCreate.hide()

        const touchPos = event.getLocation()
        const touchCoord: cc.Vec2 = this.levelMap.getTileCoordByPos(touchPos.x * 2, touchPos.y * 2)

        const tileId: number = this.levelMap.towersLayer.getTileGIDAt(touchCoord)
        if (tileId) {
            this.panelCreate.show(touchCoord)
        }
    }

    start() {

    }

    // update (dt) {}
}
