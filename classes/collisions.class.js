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
        this.collisionThrowenSalsa();
    }

    wasHurt(mo) {
        let timePassed = new Date().getTime() - mo.lastHit; // Differenc in ms
        return timePassed >= 450;
    }

    collisionChicken() {
        this.world.level.enemies
            .filter((enemy) => enemy instanceof Chicken || enemy instanceof SmallChicken)
            .forEach((enemy) => {
                if (this.world.character.isColliding(enemy) && this.world.character.isAboveGround()) {
                    enemy.lifePoints = 0;
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
            if (this.world.character.isAboveGround() && this.world.character.isColliding(coin) && coin.speedY === 0) {
                coin.applyGravity();
                this.coins += 20;
                this.world.level.statusBar[1].setPercentage(this.coins)
            }
        });
    }

    collisionSalsa() {
        this.world.level.salsaBottles.forEach(salsa => {
            if (this.world.character.isColliding(salsa) && salsa.speedY === 0) {
                salsa.applyGravity();
                this.salsaPrecent += 20;
                this.world.level.statusBar[2].setPercentage(this.salsaPrecent);
                this.salsaBottle++;
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

    collisionThrowenSalsa() {
        this.world.throwableObjects.forEach((bottle) => {
            const endBoss = this.world.level.enemies[this.world.level.enemies.length - 1];
            if (bottle.isColliding(endBoss) && this.wasHurt(this.world.level.enemies[this.world.level.enemies.length - 1])) {
                this.hitEndBoss(endBoss);
            }
        })
    }

    hitEndBoss(endBoss) {
        endBoss.hit(35);
        if (endBoss.lifePoints >= 0) {
            this.world.level.statusBar[3].setPercentage(endBoss.lifePoints);
        } else {
            this.deadEndBoss(endBoss);
        }
    }

    deadEndBoss(endBoss) {
        this.world.level.statusBar[3].setPercentage(0);
        clearInterval(endBoss.enableMovment);
        setTimeout(() => {
            clearInterval(endBoss.animate);
        }, 550);
    }

}