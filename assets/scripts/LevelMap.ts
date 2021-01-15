const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelMap extends cc.Component {
    @property(cc.TiledMap)
    tiledMap: cc.TiledMap = null
    @property(cc.TiledLayer)
    roadLayer: cc.TiledLayer = null
    @property(cc.TiledLayer)
    towersLayer: cc.TiledLayer = null
    @property(cc.TiledObjectGroup)
    pathGroup: cc.TiledObjectGroup = null

    tileSize: cc.Size // (pixels)
    mapSize: cc.Size // (tiles)

    init() {
        // attach components in engine instead to improve performance and avoid string references
        // this.tiledMap = this.node.getComponent(cc.TiledMap)

        this.tileSize = this.tiledMap.getTileSize()
        this.mapSize = this.tiledMap.getMapSize()
    }

    start() {
    }

    // update (dt) {}

    getTileCoordByPos(x: number | cc.Vec2, y?: number): cc.Vec2 {
        if (typeof x === 'number' && typeof y === 'number') {
            return new cc.Vec2(Math.floor(x / this.tileSize.width), this.mapSize.height - Math.floor(y / this.tileSize.height) - 1)
        } else if(x instanceof cc.Vec2) {
            return new cc.Vec2(Math.floor(x.x / this.tileSize.width), this.mapSize.height - Math.floor(x.y / this.tileSize.height) - 1)
        }
    }
}
