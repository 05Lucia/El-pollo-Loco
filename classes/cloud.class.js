class Cloude extends MovebaleObject {
    y = 20;
    height = 300;
    width = 500;

    /**
   * Creates a new cloud instance.
   * 
   * @param {string} img - The path to the image for the cloud.
   */
    constructor(img) {
        super().loadeImage(img);
        this.x = Math.random() * 2700;
        this.animate();
    }

    /**
   * Starts an animation loop that continuously moves the cloud to the left.
   */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}