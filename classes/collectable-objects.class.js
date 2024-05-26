class CollectableObjects extends MovebaleObject{
    y = 180;
    height = 100;
    width = 100;
    activ = true;

    /**
   * Creates a new collectable object instance.
   * 
   * @param {number} y - The initial y-coordinate of the object.
   * @param {string} img - The path to the image for the object.
   */
    constructor(y, img){
        super().loadeImage(img);
        this.y = y;
        this.x = -300+Math.random()*2000;
    }
}