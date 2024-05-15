class Cloude extends MovebaleObject {
    y = 20;
    height = 300;
    width = 500;

    constructor() {
        super().loadeImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000/60);

    }
}