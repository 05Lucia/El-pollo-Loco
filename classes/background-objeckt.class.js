class BackgroundObject extends MovebaleObject{
    width = 720;
    height = 480;

    constructor(imagePath, x){
        super().loadeImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}