class Collisions {
    world;
    coins = 0;
    salsaPrecent = 0;
    salsaBottle = 0;

    checkCollisions() {
        this.collisionChicken();
        this.collisionCoin();
        this.collisionSalsa();
    }

    wasHurt() {
        let timePassed = new Date().getTime() - this.world.character.lastHit; // Differenc in ms
        return timePassed >= 450;
    }

    collisionChicken() {
        this.world.level.enemies
            .filter(
                (enemy) =>
                    enemy instanceof Chicken
            )
            .forEach((enemy) => {
                if (this.world.character.isColliding(enemy) && this.world.character.isAboveGround()) {
                    enemy.lifePoints = 0;
                } if (this.world.character.isColliding(enemy) &&
                    !(enemy.isDead()) &&
                    this.wasHurt()) {
                    this.world.character.hit(10);
                    this.world.level.statusBar[0].setPercentage(this.world.character.lifePoints);
                }
            })
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
        this.world.level.salsaBottles.forEach( salsa => {
            if (this.world.character.isColliding(salsa) && salsa.speedY === 0) {
                salsa.applyGravity();
                this.salsaPrecent += 20;
                this.world.level.statusBar[2].setPercentage(this.salsaPrecent)
                this.salsaBottle++;
            }
        });
    }

    collisionBoss(){
        this.world.level.enemies
            .filter(
                (enemy) =>
                    enemy instanceof Endboss
            )
            .forEach((enemy) => {
                 if (this.world.character.isColliding(enemy) &&
                    !(enemy.isDead()) &&
                    this.wasHurt()) {
                    this.world.character.hit(10);
                    this.world.level.statusBar[0].setPercentage(this.world.character.lifePoints);
                }
            })
    }
}