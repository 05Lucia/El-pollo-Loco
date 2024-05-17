class MovebaleObject {
    x = 120;
    y = 350;
    img;
    height = 140;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } if (!(this.isAboveGround())) {
                this.speedY = 0;
            }


        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 130;
    }

    loadeImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"
        this.img.src = path;
    }

    loadeImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;// let i = 0 % 6 => 0, 1, 2, 3, 4, 5, 0, 1, ,2 ....
        let path = imgArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}