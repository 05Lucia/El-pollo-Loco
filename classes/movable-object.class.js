class MovebaleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    lifePoints = 100;
    lastHit = 1;
    chicken_sound = new Audio('./audio/chicken.mp3')
    dead = false;

    applyGravity(ground) {
        setInterval(() => {
            if (this.isAboveGround(ground) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } if (!(this.isAboveGround(ground))) {
                this.speedY = 0;
            }
        }, 1000 / 60)
    }

    isAboveGround(ground) {
        if (this instanceof CollectableObjects) {
            return true
        } else {
            return this.y < ground;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit(hitPoints) {
        if (this.lifePoints > 0) {
            this.lifePoints -= hitPoints;
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenc in ms
        timePassed = timePassed / 1000 // in s
        return timePassed < 0.5;
    }

    isDead() {
        if (this.lifePoints <= 0) {
            return true;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft(speed) {
        this.x -= this.speed;
    }

    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;// let i = 0 % 6 => 0, 1, 2, 3, 4, 5, 0, 1, ,2 ....
        let path = imgArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isClose(mo) {
        let distance = mo.x - (this.x + this.width) 
        return distance < 290;
    }

}