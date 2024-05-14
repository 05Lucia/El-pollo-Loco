class BackgroundObject extends MovebaleObject{
    width = 720;
    height = 300;

    constructor(imagePath, x, y){
        super().loadeImage(imagePath);
        this.y = y;
        this.x = x;
    }
}