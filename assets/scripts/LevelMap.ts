const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.TiledMap)
    tiledMap: cc.TiledMap = null
    @property(cc.TiledLayer)
    roadLayer: cc.TiledLayer = null
    @property(cc.TiledLayer)
    towersLayer: cc.TiledLayer = null

    tileSize: cc.Size
    mapSize: cc.Size

    onLoad() {
        // attach components in engine instead to improve performance and avoid string references
        // this.tiledMap = this.node.getComponent(cc.TiledMap)

        this.tileSize = this.tiledMap.getTileSize()
    }

    start() {
    }

    // update (dt) {}
}
