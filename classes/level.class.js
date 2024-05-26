class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusBar;
    level_end_x = 2200;
    salsaBottles;
    coins;

    /**
   * Creates a new level instance.
   * 
   @param {MovebaleObject[]} enemies - An array of enemy objects.
   @param {DrawableObject[]} clouds - An array of cloud objects.
   @param {DrawableObject[]} backgroundObjects - An array of background objects.
   @param {StatusBar} statusBar - The status bar object for the level.
   @param {ThrowableObject[]} salsaBottles - An array of salsa bottle objects.
   @param {DrawableObject[]} coins - An array of coin objects.
   */
    constructor(enemies, clouds, backgroundObjects, statusBar, salsaBottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBar = statusBar;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
    }
}