class ThrowableObject extends MovebaleObject {
    speedY = 30;
    height = 100;
    width = 80;
    IMG_TROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMG_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    spalsh;
    activ = true;
    throwing_sound = new Audio('./audio/throw.mp3');
    splashing_sound = new Audio('./audio/splash.mp3');

    /**
   * Creates a new throwable object at the specified position.
   * - Loads the default image (`salsa_bottle.png`).
   * - Loads additional images for throwing and splash animations.
   * - Sets the initial position (x, y).
   * - Starts the throwing motion.
   * 
   @param {number} x - The initial x-coordinate of the object.
   @param {number} y - The initial y-coordinate of the object.
   */
    constructor(x, y) {
        super().loadeImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadeImages(this.IMG_TROW);
        this.loadeImages(this.IMG_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
   * Starts the throwing motion of the object.
   * - Applies gravity with a specific force (370).
   * - Plays the throwing sound effect.
   */
    throw() {
        this.applyGravity(370);
        this.throwing_sound.play();
    }

    /**
   * Internal function that continuously updates the object's position during the throw.
   * - Checks if the object is still above ground (considering a specific force of 370).
   *   - If above ground, moves the object forward by 12 pixels.
   *   - If not above ground, stops movement and triggers the `salsaHit` function.
   *     - Clears the `spalsh` interval (for a splash animation).
   */
    throwforward = setInterval(() => {
        if (this.isAboveGround(370)) {
            this.x += 12;
        } else {
            this.x += 0;
            this.salsaHit();
            setTimeout(() => {
                clearInterval(this.spalsh);
            }, 1000);
        }
    }, 25);

    /**
   * Internal function that continuously plays the throwing animation.
   * - Plays the throwing animation frame from the `IMG_TROW` property.
   */
    animateTrow = setInterval(() => {
        this.playAnimation(this.IMG_TROW);
    }, 1000 / 25);

    /**
   * Called when the object hits the ground.
   * - Plays the splashing sound effect with lower volume.
   * - Deactivates the object.
   * - Stops movement and clears throwing and animation intervals.
   * - Starts a new interval to play the splash animation.
   */
    salsaHit() {
        this.splashing_sound.volume = 0.5;
        this.splashing_sound.play();
        this.activ = false;
        this.x += 0;
        clearInterval(this.animateTrow);
        clearInterval(this.throwforward);
        this.spalsh = setInterval(() => {
            this.playAnimation(this.IMG_SPLASH);
        }, 200);
    }
}