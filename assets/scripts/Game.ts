import { Events, BuildTowerData, EnemyAttackData } from "./Events";
import Helpers from "./Helpers";
import LevelMap from "./LevelMap";
import PanelCreate from "./PanelCreate";
import Tower from "./Tower";
import TowerSpawner from "./TowerSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(LevelMap)
    levelMap: LevelMap = null
    @property(PanelCreate)
    panelCreate: PanelCreate = null
    @property(TowerSpawner)
    towerSpawner: TowerSpawner = null
    // @property
    health: number = 69

    onLoad() {
        this.init()
        this.setEvents()
        Helpers.enableCollision(false)
    }

    // init all components here instead of onLoad to ensure the availabilities
    init() {
        this.levelMap.init()
        this.panelCreate.init(this.levelMap)
        this.towerSpawner.init(this.levelMap)
    }

    setEvents() {
        this.levelMap.node.on(cc.Node.EventType.TOUCH_END, this.onMapTouch, this)
        this.panelCreate.node.on(Events.BUILD_TOWER, this.createTower, this)
        this.node.on(Events.ENEMY_ATTACK, this.getAttacked, this)
    }

    getAttacked(event: cc.Event.EventCustom) {
        const data: EnemyAttackData = event.getUserData()
        this.health -= data.damage
        
        // stop event delivery
        event.stopPropagation();
    }

    createTower(data: BuildTowerData) {
        this.towerSpawner.createTower(data)
        this.panelCreate.hide()
    }

    onMapTouch(event: cc.Event.EventTouch) {
        this.panelCreate.hide()

        const touchPos = event.getLocation()
        const touchCoord: cc.Vec2 = this.levelMap.getTileCoordByPos(touchPos.x * 2, touchPos.y * 2)

        const tileId: number = this.levelMap.towersLayer.getTileGIDAt(touchCoord)
        if (tileId) {
            const tower: Tower = this.towerSpawner.findTowerByCoord(touchCoord)
            if (!tower)
                this.panelCreate.show(touchCoord)
        }
    }

    start() {

    }

    // update (dt) {}
}
