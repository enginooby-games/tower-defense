import EnemyWave from "./EnemyWave";
import LevelMap from "./LevelMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemySpawner extends cc.Component {
    @property(cc.Label)
    countdownLabel: cc.Label = null
    @property(cc.Label)
    waveCountLabel: cc.Label = null
    @property({ type: cc.Prefab })
    enemyWavePrefabs: cc.Prefab[] = []
    // @property
    waveInterval: number = 15
    // @property
    waveAmount: number = 10
    // @property
    firstDelay: number = 15

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
        this.createEnemyWave() // kick off first wave immediately
        this.schedule(this.createEnemyWave, this.waveInterval, this.waveAmount - 2) // 2 is account for first kickoff & parameter method
    }

    createEnemyWave() {
        const enemyWaveNode: cc.Node = cc.instantiate(this.enemyWavePrefabs[0]) //TODO: first prefab for now
        this.node.addChild(enemyWaveNode)

        const enemyWave: EnemyWave = enemyWaveNode.getComponent(EnemyWave)
        enemyWave.init(this.levelMap)

        this.currentWave++
        this.updateLabel()
        this.countdown(this.waveInterval)
    }

    updateLabel() {
        this.waveCountLabel.string = `Current wave: ${this.currentWave}/${this.waveAmount}`
    }

    countdown(duration: number) {
        let timeLeft: number = duration
        this.schedule(() => {
            this.countdownLabel.string = `Next wave: ${--timeLeft} (s)`
        }, 1, duration - 1)
    }
}
