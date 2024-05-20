class StatusBar extends DrawableObject {
    IMG_STAT_HEALTH = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;

    constructor() {
        super().loadeImage('./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadeImages(this.IMG_STAT_HEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 100;
        this.setPercentage(100);
    }

    // setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMG_STAT_HEALTH[this.resolveImageIndex()];
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
