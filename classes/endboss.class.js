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
    lifePoints = 100;
    speed = 0.3;

    constructor() {
        super().loadeImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadeImages(this.IMG_WALKING);
        this.loadeImages(this.IMG_DEAD);
        this.loadeImages(this.IMG_HURT);
        this.x = 2400;
    }

    enableMovment = setInterval(() => {
        this.moveLeft();
    }, 1000 / 60);

    animate = setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMG_DEAD);
            clearInterval(this.enableMovment);
            this.loadeImage(this.IMG_DEAD[2])
        } else if (this.isHurt(this.speed)) {
            this.playAnimation(this.IMG_HURT);
        } else {
            this.playAnimation(this.IMG_WALKING);
        }
    }, 200)

    
        


}