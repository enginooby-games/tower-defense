import Enemy from "./Enemy";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass("WaveData")
class WaveData {
    @property(cc.Float)
    spawnInterval: number = 0.5;
    @property(cc.Integer)
    amount: number = 10;
    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null
}

@ccclass
export default class EnemySpawner extends cc.Component {
    @property(cc.Label)
    countdownLabel: cc.Label = null
    @property(cc.Label)
    waveCountLabel: cc.Label = null
    @property
    waveInterval: number = 30
    @property
    firstDelay: number = 15
    @property({ type: WaveData })
    waveDatas: WaveData[] = []

    currentWave: number = 0
    levelMap: LevelMap = null

    init(map: LevelMap) {
        this.levelMap = map
        this.updateLabel()
        this.countdown(this.firstDelay)
        this.scheduleOnce(() => {
            this.createEnemyWaves()
        }, this.firstDelay)
    }

    createEnemyWaves() {
        if (this.waveDatas.length) {
            this.createCurrentEnemyWave() // kick off first wave immediately
        }

        if (this.waveDatas.length > 1) {
            this.schedule(this.createCurrentEnemyWave, this.waveInterval, this.waveDatas.length - 2) // 2 is account for first kickoff & parameter method
        }
    }

    createCurrentEnemyWave() {
        const data: WaveData = this.waveDatas[this.currentWave]

        this.schedule(() => {
            this.createEnemy(data.enemyPrefab)
        }, data.spawnInterval, data.amount)

        this.currentWave++
        this.updateLabel()
        this.countdown(this.waveInterval)
    }

    createEnemy(enemyPrefab: cc.Prefab) {
        const enemyNode: cc.Node = cc.instantiate(enemyPrefab)
        this.node.addChild(enemyNode)

        const enemy = enemyNode.getComponent(Enemy)
        enemy.init(this.levelMap)
    }

    updateLabel() {
        this.waveCountLabel.string = `Current wave: ${this.currentWave}/${this.waveDatas.length}`
    }

    countdown(duration: number) {
        let timeLeft: number = duration
        this.schedule(() => {
            this.countdownLabel.string = `Next wave: ${--timeLeft} (s)`
        }, 1, duration - 1)
    }
}
