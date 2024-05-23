class CollectableObjects extends MovebaleObject{
    y = 180;
    height = 100;
    width = 100;
    activ = true;

    constructor(y, img){
        super().loadeImage(img);
        this.y = y;
        this.x = -300+Math.random()*2000;
    }
}