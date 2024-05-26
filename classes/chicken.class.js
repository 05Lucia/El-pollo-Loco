class Chicken extends MovebaleObject {
    height = 100;
    IMG_WALKING_CHICKEN = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    IMG_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    lifePoints = 10;

    /**
   * Creates a new chicken instance.
   */
    constructor() {
        super().loadeImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 2100;
        this.loadeImages(this.IMG_WALKING_CHICKEN);
        this.loadeImages(this.IMG_DEAD);
        this.speed = 0.15 + Math.random() * 0.6;
        this.animate();
    }
    
    /**
   * Starts an interval that continuously moves the chicken to the left at its set speed.
   * The interval ID for movement (private property)
   * @type {number} 
   */
    enableMovment = setInterval(() => {
        this.moveLeft(this.speed);
    }, 1000 / 60);

    /**
   * Starts an animation loop that plays the chicken's walking animation or dead state.
   */
    animate() {
        this.enableAnimation();
    }

    /**
   * Starts an interval that plays the appropriate animation (walking or dead) based on the chicken's life points.
   * The interval ID for animation (private property)
   * @type {number} 
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