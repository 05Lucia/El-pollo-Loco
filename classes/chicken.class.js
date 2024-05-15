class Chicken extends MovebaleObject{
    height = 100;
    IMG_WALKING_CHICKEN = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadeImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300+Math.random()*500;
        this.loadeImages(this.IMG_WALKING_CHICKEN)
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
        
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMG_WALKING_CHICKEN.length;// let i = 0 % 6 => 0, 1, 2, 3, 4, 5, 0, 1, ,2 ....
            let path = this.IMG_WALKING_CHICKEN[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 300)
    }
    
}