class Chicken extends MovebaleObject{
    height = 100;
    IMG_WALKING_CHICKEN = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    chicken_sound = new Audio('./audio/chicken.mp3')

    constructor() {
        super().loadeImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300+Math.random()*500;
        this.loadeImages(this.IMG_WALKING_CHICKEN)
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
        this.sound();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMG_WALKING_CHICKEN);
        }, 300)
    }

    sound() {
        setInterval(() => {
            // this.chicken_sound.play();
            this.chicken_sound.volume = 0.1;
        }, 230)
    }
    
}