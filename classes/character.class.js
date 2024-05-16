class Character extends MovebaleObject {
    y = 130;
    height = 330;
    width = 160;
    speed = 10;
    IMG_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ]
    world;
    running_sound = new Audio('./audio/running.mp3')


    constructor() {
        super().loadeImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadeImages(this.IMG_WALKING)
        this.animate();
    }

    animate() {
        setInterval(() => {
           
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -600 ) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x +100;
        }, 1000 / 60)

        setInterval(() => {
            this.running_sound.pause();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMG_WALKING);
                this.running_sound.play();
            }
        }, 50);

    }

    jump() {

    }
}