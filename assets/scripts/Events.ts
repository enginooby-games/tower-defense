export enum Events {
    ENEMY_FINISH = 'ENEMY_FINISH',
    PANEL_TOUCH = 'PANEL_TOUCH'
}

export type PanelTouchData = {
    towerName: string,
    coord: cc.Vec2
}