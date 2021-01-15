export enum Events {
    ENEMY_ATTACK = 'ENEMY_ATTACK',
    BUILD_TOWER = 'BUILD_TOWER'
}

export type BuildTowerData = {
    towerName: string,
    coord: cc.Vec2
}

export type EnemyAttackData = {
    damage: number
}