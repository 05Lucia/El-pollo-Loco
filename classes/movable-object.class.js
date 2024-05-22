class MovebaleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    lifePoints = 100;
    lastHit = 1;

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
        if (this instanceof ThrowableObject || this instanceof CollectableObjects) {
            return true
        } else {
            return this.y < 130;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    // Formel zur Kollisionsberechnung (Genauer)
    // tisColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.Y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }


    hit(hitPoints) {
        if (this.lifePoints > 0) {
            this.lifePoints -= hitPoints;
            this.lastHit = new Date().getTime();
            console.log('LP:', this.lifePoints);
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenc in ms
        timePassed = timePassed / 1000 // in s
        return timePassed < 0.3;
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