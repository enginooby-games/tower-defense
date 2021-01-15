const { ccclass, property } = cc._decorator;

@ccclass
export default class Tower extends cc.Component {
    coord: cc.Vec2

    // onLoad () {}

    init(coord: cc.Vec2) {
        this.coord = coord
    }

    start() {

    }

    // update (dt) {}
}
