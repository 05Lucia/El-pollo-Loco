class Character extends MovebaleObject {
    y = 130;
    height = 330;
    width = 160;

    constructor() {
        super().loadeImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadeImages([
            './img/2_character_pepe/2_walk/W-21.png',
            './img/2_character_pepe/2_walk/W-22.png',
            './img/2_character_pepe/2_walk/W-23.png',
            './img/2_character_pepe/2_walk/W-24.png',
            './img/2_character_pepe/2_walk/W-25.png',
            './img/2_character_pepe/2_walk/W-26.png'
        ])
    }

    jump() {

    }
}