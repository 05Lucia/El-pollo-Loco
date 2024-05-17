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
    lifePoints = 100;
    lastHit = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    //Formel zur Kollisionsberechnung (Genauer)
    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.Y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }


    hit() {
        if (this.lifePoints > 0) {
            this.lifePoints -= 5;
            console.log('colision with Character LP', this.lifePoints);
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenc in ms
        timePassed = timePassed / 1000 // in s
        return timePassed < 1;
    }

    isDead() {
        if (this.lifePoints === 0) {
            return true;
        }
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