class StatusBar extends DrawableObject {
    IMG_STATS= [];
    x = 30;
    y = 0;
    width = 160;
    height = 60;
    percentage = 100;

    /**
   * Creates a new status bar instance.
   * - Loads the default image from the first element of `imgs`.
   * - Stores all image paths in `IMG_STATS`.
   * - Sets the initial position (x) and loads all images.
   * - Sets the initial percentage value.
   * 
   @param {number} x - The initial x-coordinate of the status bar.
   @param {string[]} imgs - An array of image paths for different status levels.
   @param {number} precent - The initial percentage value for the status bar.
   */
    constructor(x, imgs, precent) {
        super().loadeImage(imgs[0]);
        this.IMG_STATS = imgs;
        this.x = x;
        this.loadeImages(this.IMG_STATS);
        this.setPercentage(precent);
    }

    /**
   * Sets the new percentage value for the status bar and updates the image accordingly.
   * 
   @param {number} percentage - The new percentage value (0-100).
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMG_STATS[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
   * Determines the index of the image to be displayed based on the current percentage value.
   * - Returns 0 for 0% status.
   * - Returns 1 for 1-20% status, and so on (up to 5 for 81-100% status).
   * 
   @returns {number} - The index of the image to be used based on the percentage.
   */
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
