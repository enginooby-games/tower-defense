const { ccclass, property } = cc._decorator;

@ccclass
export default class MultiIconssButton extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite = null
    @property(cc.SpriteFrame)
    activeSprite: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    inactiveSprite: cc.SpriteFrame = null

    sprite: cc.Sprite = null
    currentSpriteFrame: cc.SpriteFrame = null

    start() {
        this.currentSpriteFrame = this.activeSprite
    }

    toggleSprite() {
        if (this.currentSpriteFrame === this.activeSprite) {
            this.currentSpriteFrame = this.inactiveSprite
        } else {
            this.currentSpriteFrame = this.activeSprite
        }

        this.icon.spriteFrame = this.currentSpriteFrame
    }
}
