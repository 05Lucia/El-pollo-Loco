class Collisions {
    world;
    coins = 0;
    salsaPrecent = 0;
    salsaBottle = 0;

    checkCollisions() {
        this.collisionChicken();
        this.collisionCoin();
        this.collisionSalsa();
        this.collisionBoss();
        this.collisionSalsaHitBoss();
        this.collisionSalsaHitChiken();
        this.closnesToBoss();
    }

    wasHurt(mo) {
        let timePassed = new Date().getTime() - mo.lastHit; // Differenc in ms
        return timePassed >= 450;
    }

    collisionChicken() {
        this.world.level.enemies
            .filter((enemy) => enemy instanceof Chicken || enemy instanceof SmallChicken)
            .forEach((enemy) => {
                if (this.world.character.isColliding(enemy) && this.world.character.isAboveGround(130)) {
                    enemy.lifePoints = 0;
                    enemy.chicken_sound.play();
                } else if (this.world.character.isColliding(enemy) && !(enemy.isDead()) && this.wasHurt(this.world.character)) {
                    this.characterHurting();
                } else if (this.world.character.isDead()) {
                    this.characterIsDying();
                }
            });
    }

    characterHurting() {
        this.world.character.hit(10);
        if (this.world.character.lifePoints >= 0) {
            this.world.level.statusBar[0].setPercentage(this.world.character.lifePoints);
        } else {
            this.world.level.statusBar[0].setPercentage(0);
        }
    }

    characterIsDying() {
        clearInterval(this.world.character.idelAnimation);
        clearInterval(this.world.character.enableMovment);
        setTimeout(() => {
            clearInterval(this.world.character.animation);
        }, 509);
    }

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

    collisionSalsaHitBoss() {
        this.world.throwableObjects.forEach((bottle) => {
            const endBoss = this.world.level.enemies[this.world.level.enemies.length - 1];
            if (bottle.isColliding(endBoss) && this.wasHurt(endBoss) && bottle.activ === true) {
                this.hitEndBoss(endBoss);
                bottle.salsaHit();
                setTimeout(() => {
                    clearInterval(bottle.spalsh);
                }, 1000);
            }
        })
    }

    hitEndBoss(endBoss) {
        endBoss.hit(35);
        if (endBoss.lifePoints >= 0) {
            this.world.level.statusBar[3].setPercentage(endBoss.lifePoints);
        } else {
            this.deadEndBoss(endBoss);
            // this.world.won();
        }
    }

    deadEndBoss(endBoss) {
        this.world.level.statusBar[3].setPercentage(0);
        clearInterval(endBoss.enableMovment);
        clearInterval(this.world.character.idelAnimation)
        setTimeout(() => {
            clearInterval(endBoss.animate);
        }, 550);
        this.world.won();
    }

    collisionSalsaHitChiken() {
        this.world.throwableObjects.forEach((bottle) => {
            this.world.level.enemies.filter((enemy) => enemy instanceof Chicken || enemy instanceof SmallChicken)
            .forEach((enemy) => {
            if (bottle.isColliding(enemy) && this.wasHurt(enemy) && bottle.activ === true) {
                enemy.lifePoints = 0;
                enemy.chicken_sound.play();
                bottle.salsaHit();
                setTimeout(() => {
                    clearInterval(bottle.spalsh);
                }, 1000);
            }})
        })
    }

    closnesToBoss() {
        const endBoss = this.world.level.enemies[this.world.level.enemies.length - 1];
        if (this.world.character.isClose(endBoss)) {
            endBoss.alerted = true;
        }
    }

}