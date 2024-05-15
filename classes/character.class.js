class Character extends MovebaleObject {
    y = 130;
    height = 330;
    width = 160;
    IMG_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ]
    world;


    constructor() {
        super().loadeImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadeImages(this.IMG_WALKING)
        this.animate();
    }

    animate() {


        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMG_WALKING.length;// let i = 0 % 6 => 0, 1, 2, 3, 4, 5, 0, 1, ,2 ....
                let path = this.IMG_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 250);



    }

    jump() {

    }
}