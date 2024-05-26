class BackgroundObject extends MovebaleObject{
    width = 720;
    height = 480;

    /**
   * Creates a new background object instance.
   * 
   * @param {string} imagePath - The path to the image for the background object.
   * @param {number} x - The initial x-coordinate of the object on the canvas.
   */
    constructor(imagePath, x){
        super().loadeImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}