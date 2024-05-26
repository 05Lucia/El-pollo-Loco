class Endboss extends MovebaleObject {
    y = 80;
    height = 400;
    width = 300;
    IMG_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMG_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMG_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMG_ALERTED = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    lifePoints = 100;
    speed = 0.3;
    alerted = false;

    /**
   * Creates a new endboss enemy.
   * - Loads the default walking animation image.
   * - Sets the starting position on the x-axis.
   * - Loads walking, dead, hurt, and alerted animation images.
   * - Starts the movement and animation loops.
   */
    constructor() {
        super().loadeImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadeImages(this.IMG_WALKING);
        this.loadeImages(this.IMG_DEAD);
        this.loadeImages(this.IMG_HURT);
        this.loadeImages(this.IMG_ALERTED);
        this.x = 2400;
    }

    /**
   * Internal function that continuously moves the endboss to the left.
   * - Moves the endboss leftward by its speed value.
   */
    enableMovment = setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);

    /**
   * Internal function that continuously plays the appropriate animation.
   * - Checks if the endboss is dead, hurt, alerted, or in its normal walking state.
   *   - Plays the dead animation, stops movement, and updates the last image if dead.
   *   - Plays the hurt animation and a sound effect if hurt.
   *   - Plays the alerted animation if alerted.
   *   - Plays the walking animation otherwise.
   */
    animate = setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMG_DEAD);
            clearInterval(this.enableMovment);
            this.loadeImage(this.IMG_DEAD[2])
        } else if (this.isHurt(this.speed)) {
            this.playAnimation(this.IMG_HURT);
            if (music === true) {
                this.chicken_sound.play();  
              }
        } else if (this.alerted === true) {
            this.playAnimation(this.IMG_ALERTED);
        } else {
            this.playAnimation(this.IMG_WALKING);
        }
    }, 200);
}