class BackgroundObject extends MovebaleObject{
    width = 720;
    height = 300;

    constructor(imagePath, x){
        super().loadeImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}