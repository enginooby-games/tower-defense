const { ccclass, property } = cc._decorator;

@ccclass
export default class Panel extends cc.Component {
    @property
    cost: number = 50
    @property(cc.Sprite)
    icon: cc.Sprite = null
    @property(cc.Label)
    label: cc.Label = null

    name: string = null
    // onLoad () {}

    start() {
        this.name = this.icon.spriteFrame.name
        this.label.string = this.cost.toString()
    }

    // update (dt) {}
}
