import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(LevelMap)
    levelMap: LevelMap = null

    onLoad() {
        this.init()
        this.setEvents()
    }

    init() {
        this.levelMap.init()
    }

    setEvents() {
        this.levelMap.node.on(cc.Node.EventType.TOUCH_END, this.onMapTouch, this)
    }

    onMapTouch(event: cc.Event.EventTouch) {
        const touchPos = event.getLocation()
        const touchCoord: cc.Vec2 = this.levelMap.getTileCoordByPos(touchPos.x * 2, touchPos.y * 2)

        const tileId: number = this.levelMap.towersLayer.getTileGIDAt(touchCoord)
    }

    start() {

    }

    // update (dt) {}
}
