import Enemy from "./Enemy";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass("EnemyData")
class EnemyData {
    @property({ type: cc.Prefab })
    enemyPrefab: cc.Prefab = null
    @property({ type: cc.Integer })
    enemyRatio: number = 1
}

@ccclass("WaveData")
class WaveData {
    @property(cc.Float)
    spawnInterval: number = 0.5;
    @property(cc.Integer)
    totalEnemyAmount: number = 10;
    @property({ type: EnemyData })
    enemyDatas: EnemyData[] = []
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
        const waveData: WaveData = this.waveDatas[this.currentWave]

        // loop through all enemy datas by each ratio
        let currentEnemyData: EnemyData = waveData.enemyDatas[0]
        let currentEnemyDataIndex: number = 0
        let enemySpawnCountPerRatio: number = 0
        const moveToNextEnemyData = function () {
            if (currentEnemyDataIndex < waveData.enemyDatas.length - 1) {
                currentEnemyDataIndex++
            } else {
                // loop back to first data
                currentEnemyDataIndex = 0
            }
            // reset count for next data
            enemySpawnCountPerRatio = 0
            currentEnemyData = waveData.enemyDatas[currentEnemyDataIndex]
            // skip to nex data if ratio = 0
            if (!currentEnemyData.enemyRatio) moveToNextEnemyData()
        }

        this.schedule(() => {
            this.createEnemy(currentEnemyData.enemyPrefab)

            // if complete spawn ratio of current enemy data
            if (++enemySpawnCountPerRatio === currentEnemyData.enemyRatio) {
                moveToNextEnemyData()
            }
        }, waveData.spawnInterval, waveData.totalEnemyAmount - 1)

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
