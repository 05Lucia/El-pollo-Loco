class Chicken extends MovebaleObject{
    height = 100;

    constructor() {
        super().loadeImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 300+Math.random()*500;
    }
    
}