class SmallChicken extends MovebaleObject {
    height = 50;
    y = 400;
    width = 50;
    IMG_WALKING_CHICKEN = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMG_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    lifePoints = 10;

    /**
   * Creates a new small chicken enemy.
   * - Loads the default walking animation image.
   * - Sets a random starting position on the x-axis.
   * - Loads walking and dead animation images.
   * - Sets a random movement speed.
   * - Starts the movement and animation loops.
   */
    constructor() {
        super().loadeImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 2000;
        this.loadeImages(this.IMG_WALKING_CHICKEN);
        this.loadeImages(this.IMG_DEAD);
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
    }

    /**
   * Internal function that continuously moves the chicken to the left.
   * - Moves the chicken leftward by its speed value.
   */
    enableMovment = setInterval(() => {
        this.moveLeft(this.speed);
    }, 1000 / 60);

    /**
   * Starts the animation loop for the small chicken.
   */
    animate() {
        this.enableAnimation();
    }

    /**
   * Internal function that continuously plays the appropriate animation.
   * - Checks if the chicken is dead using the `isDead` function.
   *   - If dead, plays the dead animation, stops movement, and adjusts size/position.
   *   - If alive, plays the walking animation.
   */
    enableAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMG_DEAD);
                clearInterval(this.enableMovment);
                this.height = 100;
                this.y = 350;
            } else {
                this.playAnimation(this.IMG_WALKING_CHICKEN);
            }
        }, 300)
    }
}