class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusBar;
    level_end_x = 2200;
    salsaBottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, statusBar, salsaBottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBar = statusBar;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
    }
}