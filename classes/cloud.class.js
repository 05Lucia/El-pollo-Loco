class Cloude extends MovebaleObject {
    y = 20;
    height = 300;
    width = 500;


    constructor(img) {
        super().loadeImage(img);

        this.x = Math.random() * 2700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}