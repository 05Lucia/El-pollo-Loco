class StatusBar extends DrawableObject {
    IMG_STATS= [];
    x = 40;
    y = 0;
    width = 200;
    height = 90;
    percentage = 100;

    constructor(x, imgs) {
        super().loadeImage(imgs[0]);
        this.IMG_STATS = imgs;
        this.x = x;
        this.loadeImages(this.IMG_STATS);
        this.setPercentage(100);
    }

    // setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMG_STATS[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } if (this.percentage <= 20 && this.percentage > 0) {
            return 1;
        } if (this.percentage <= 40 && this.percentage > 20) {
            return 2;
        } if (this.percentage <= 60 && this.percentage > 40) {
            return 3;
        } if (this.percentage <= 80 && this.percentage > 60) {
            return 4;
        } if (this.percentage <= 100 && this.percentage > 80) {
            return 5;
        }
    }

}
