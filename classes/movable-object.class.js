class MovebaleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    lifePoints = 100;
    lastHit = 1;
    chicken_sound = new Audio('./audio/chicken.mp3')
    dead = false;
    offsetY = 0;
    offsetX = 70;

    /**
   * Applies gravity to the object, simulating falling motion.
   * - Checks if the object is above the ground or has upward speed.
   *   - If so, updates the y-coordinate and speedY (vertical movement speed) based on gravity.
   * - If the object touches the ground, sets speedY to 0 (stops falling).
   * 
   @param {number} ground - The y-coordinate representing the ground level.
   */
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

    /**
   * Checks if the object is above a certain ground level.
   * - For collectable objects, always returns true.
   * - For other objects, returns true if the object's y-coordinate is lower than the ground level.
   * 
   @param {number} ground - The y-coordinate representing the ground level.
   @returns {boolean} - True if the object is above the ground, false otherwise.
   */
    isAboveGround(ground) {
        if (this instanceof CollectableObjects) {
            return true
        } else {
            return this.y < ground;
        }
    }

    /**
   * Checks for collision between this object and another movable object.
   * - Uses axis-aligned bounding box (AABB) collision detection.
   * - Returns true if the objects' bounding boxes overlap, false otherwise.
   * 
   @param {MovebaleObject} mo - The other movable object to check for collision with.
   @returns {boolean} - True if there's a collision, false otherwise.
   */
   isColliding(mo) {
    const myRight = this.x + this.width - this.offsetX; // Right edge of this object minus offset
    const myTop = this.y - this.offsetY; // Top edge of this object with offset
    const moRight = mo.x + mo.width; // Right edge of the other object (mo)
    const moBottom = mo.y + mo.height; // Bottom edge of the other object
  
    return myRight >= mo.x && // Right edge of this object past left edge of mo
           this.x + this.offsetX <= moRight &&  // Left edge of this object before right edge of mo
           myTop <= moBottom &&   // Top edge of this object before bottom edge of mo
           this.y + this.height >= mo.y; // Bottom edge of this object past top edge of mo
  }

    /**
   * Handles the object being hit by something (dealing damage).
   * - Reduces the object's life points if it has any remaining.
   * - Stores the time of the hit for `isHurt` function.
   * 
   @param {number} hitPoints - The amount of damage (life points) to be deducted.
   */
    hit(hitPoints) {
        if (this.lifePoints > 0) {
            this.lifePoints -= hitPoints;
            this.lastHit = new Date().getTime();
        }
    }

    /**
   * Checks if the object is recently hurt (based on a time threshold).
   * - Calculates the time difference since the last hit.
   * - Returns true if less than 0.5 seconds have passed since the last hit.
   * 
   @returns {boolean} - True if the object is recently hurt, false otherwise.
   */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenc in ms
        timePassed = timePassed / 1000 // in s
        return timePassed < 0.5;
    }

    /**
   * Checks if the object is dead (has no life points left).
   * 
   @returns {boolean} - True if the object is dead, false otherwise.
   */
    isDead() {
        if (this.lifePoints <= 0) {
            return true;
        }
    }

    /**
   * Moves the object to the right by its speed.
   */
    moveRight() {
        this.x += this.speed;
    }

    /**
   * Moves the object to the left by a specified speed.
   * 
   @param {number} speed - The speed to move the object leftward.
   */
    moveLeft(speed) {
        this.x -= this.speed;
    }

    /**
   * Plays an animation for the object from a provided image array.
   * - Uses a modulo operation to cycle through the image array.
   * - Updates the object's image based on the current animation frame index.
   * - Increments the current image index for the next frame.
   * 
   @param {string[]} imgArray - An array of image paths for the animation.
   */
    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;// let i = 0 % 6 => 0, 1, 2, 3, 4, 5, 0, 1, ,2 ....
        let path = imgArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
   * Checks if another object is close to the right side of this object.
   * 
   @param {MovebaleObject} mo - The other object to check the distance to.
   @returns {boolean} - True if the other object is within a certain distance (290 pixels) to the right.
   */
    isClose(mo) {
        let distance = mo.x - (this.x + this.width)
        return distance < 250;
    }
}