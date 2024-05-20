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

    constructor() {
        super().loadeImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadeImages(this.IMG_WALKING);
        this.animate();
        this.x = 2500;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMG_WALKING);
        }, 350)
    }
}