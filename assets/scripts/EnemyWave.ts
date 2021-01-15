import Enemy from "./Enemy";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyWave extends cc.Component {
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null
    spawnInterval: number = 0.5 // or random?
    amount: number = 10

    levelMap: LevelMap = null

    init(map: LevelMap) {
        this.levelMap = map
        this.createEnemies()
    }

    createEnemies() {
        this.schedule(this.createEnemy, this.spawnInterval, this.amount)
    }

    createEnemy() {
        const enemyNode: cc.Node = cc.instantiate(this.enemyPrefab)
        this.node.addChild(enemyNode)

        const enemy = enemyNode.getComponent(Enemy)
        enemy.init(this.levelMap)
    }
}
