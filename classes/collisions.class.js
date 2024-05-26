class Collisions {
    world;
    coins = 0;
    salsaPrecent = 0;
    salsaBottle = 0;

    /**
   * Checks for collisions between all relevant game objects in the world.
   */
    checkCollisions() {
        this.collisionChicken();
        this.collisionCoin();
        this.collisionSalsa();
        this.collisionBoss();
        this.collisionSalsaHitBoss();
        this.collisionSalsaHitChiken();
        this.closnesToBoss();
    }

    /**
   * Determines if a certain amount of time has passed since the provided object was last hurt.
   * 
   @param {MovebaleObject} mo - The object to check.
   @returns {boolean} - True if at least 450 milliseconds have passed since the last hit, false otherwise.
   */
    wasHurt(mo) {
        let timePassed = new Date().getTime() - mo.lastHit; // Differenc in ms
        return timePassed >= 450;
    }

    /**
   * Handles collisions between the character and chicken enemies.
   */
    collisionChicken() {
        this.world.level.enemies
            .filter((enemy) => enemy instanceof Chicken || enemy instanceof SmallChicken)
            .forEach((enemy) => {
                if (this.world.character.isColliding(enemy) && this.world.character.isAboveGround(130) && this.world.character.speedY < 0) {
                    enemy.lifePoints = 0;
                    if (this.world.music === true) {
                        enemy.chicken_sound.play();  
                      }
                } else if (this.world.character.isColliding(enemy) && !(enemy.isDead()) && this.wasHurt(this.world.character)) {
                    this.characterHurting();
                } else if (this.world.character.isDead()) {
                    this.characterIsDying();
                }
            });
    }

    /**
   * Handles the character taking damage from an enemy.
   */
    characterHurting() {
        this.world.character.hit(10);
        if (this.world.character.lifePoints >= 0) {
            this.world.level.statusBar[0].setPercentage(this.world.character.lifePoints);
        } else {
            this.world.level.statusBar[0].setPercentage(0);
        }
    }

    /**
   * Handles the character's death animation and stopping movement.
   */
    characterIsDying() {
        clearInterval(this.world.character.idelAnimation);
        clearInterval(this.world.character.enableMovment);
        setTimeout(() => {
            clearInterval(this.world.character.animation);
        }, 509);
    }

    /**
   * Handles collisions between the character and coins.
   */
    collisionCoin() {
        this.world.level.coins.forEach(coin => {
            if (this.world.character.isAboveGround(130) && this.world.character.isColliding(coin) && coin.speedY === 0 && coin.activ === true) {
                coin.applyGravity(500);
                this.coins += 20;
                this.world.level.statusBar[1].setPercentage(this.coins)
                coin.activ = false;
            }
        });
    }

    /**
   * Handles collisions between the character and salsa bottles on the ground.
   */
    collisionSalsa() {
        this.world.level.salsaBottles.forEach(salsa => {
            if (this.world.character.isColliding(salsa) && salsa.speedY === 0 && salsa.activ === true) {
                salsa.applyGravity(500);
                this.salsaPrecent += 20;
                this.world.level.statusBar[2].setPercentage(this.salsaPrecent);
                this.salsaBottle++;
                salsa.activ = false;
            }
        });
    }

    /**
   * Handles collisions between the character and the end boss.
   * Damages the character if they collide with the non-dead end boss.
   */
    collisionBoss() {
        this.world.level.enemies.filter((enemy) =>enemy instanceof Endboss)
            .forEach((enemy) => {
                if (this.world.character.isColliding(enemy) && !(enemy.isDead()) && this.wasHurt(this.world.character)) {
                    this.world.character.hit(20);
                    if (this.world.character.lifePoints >= 0) {
                        this.world.level.statusBar[0].setPercentage(this.world.character.lifePoints);
                    } else {
                        this.world.level.statusBar[0].setPercentage(0);
                    }
                }
            });
    }

    /**
   * Handles collisions between thrown objects (bottles) and the end boss.
   * Damages the end boss and plays a splash animation if a bottle collides.
   */
    collisionSalsaHitBoss() {
        this.world.throwableObjects.forEach((bottle) => {
            const endBoss = this.world.level.enemies[this.world.level.enemies.length - 1];
            if (bottle.isColliding(endBoss) && bottle.activ === true) {
                this.hitEndBoss(endBoss);
                bottle.salsaHit();
                setTimeout(() => {
                    clearInterval(bottle.spalsh);
                }, 1000);
            }
        })
    }

    /**
   * Damages the end boss and updates its life points on the status bar.
   * Calls `deadEndBoss` if the end boss is defeated.
   * 
   * @param {Endboss} endBoss - The end boss object.
   */
    hitEndBoss(endBoss) {
        endBoss.hit(35);
        if (endBoss.lifePoints >= 0) {
            this.world.level.statusBar[3].setPercentage(endBoss.lifePoints);
        } else {
            this.deadEndBoss(endBoss);
            // this.world.won();
        }
    }

    /**
   * Handles the end boss's defeat animation, stops its movement, and stops the character's idle animation.
   * Calls `world.won()` to indicate victory.
   * 
   * @param {Endboss} endBoss - The end boss object.
   */
    deadEndBoss(endBoss) {
        this.world.level.statusBar[3].setPercentage(0);
        clearInterval(endBoss.enableMovment);
        clearInterval(this.world.character.idelAnimation)
        setTimeout(() => {
            clearInterval(endBoss.animate);
        }, 550);
        this.world.won();
    }

    /**
   * Handles collisions between thrown objects (bottles) and chicken enemies.
   * Kills the chicken and plays a sound effect if a bottle collides with a chicken that can be hurt.
   */
    collisionSalsaHitChiken() {
        this.world.throwableObjects.forEach((bottle) => {
            this.world.level.enemies.filter((enemy) => enemy instanceof Chicken || enemy instanceof SmallChicken)
            .forEach((enemy) => {
            if (bottle.isColliding(enemy) && this.wasHurt(enemy) && bottle.activ === true) {
                enemy.lifePoints = 0;
                if (this.world.music === true) {
                  enemy.chicken_sound.play();  
                }
                
                bottle.salsaHit();
                setTimeout(() => {
                    clearInterval(bottle.spalsh);
                }, 1000);
            }})
        })
    }

    /**
   * Checks if the character is close to the end boss and sets the end boss's alerted state accordingly.
   */
    closnesToBoss() {
        const endBoss = this.world.level.enemies[this.world.level.enemies.length - 1];
        if (this.world.character.isClose(endBoss)) {
            endBoss.alerted = true;
        }
    }
}