class DrawableObject {
    x = 120;
    y = 350;
    height = 140;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
   * Loads a single image for the object from the provided path.
   * 
   * @param {string} path - The path to the image file.
   */
    loadeImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"
        this.img.src = path;
    }

    /**
   * Draws the object onto the provided canvas context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas drawing context.
   */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
   * Loads an array of images into the image cache.
   * 
   * @param {string[]} array - An array of image paths.
   */
    loadeImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}

