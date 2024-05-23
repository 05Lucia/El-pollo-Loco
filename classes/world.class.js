class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collistions = new Collisions();
    lastThrow = 300;
    throwableObjects = [];
    background_sound = new Audio('./audio/happy background loop.mp3');
    winning_sound = new Audio ('./audio/winning.mp3')
    backgroundSound;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.constantRepeat();
        this.backgroundMusic();
    }

    setWorld() {
        this.character.world = this;
        this.collistions.world = this;
    }

    constantRepeat() {
        setInterval(() => {
            this.collistions.checkCollisions();
            this.throwObjects();
        }, 1000 / 60);
    }

    backgroundMusic() {
        this.backgroundSound = setInterval(() => {
            this.background_sound.volume = 0.07;
            // this.background_sound.play();// -------------------- put a mute button in!!!!!
        }, 1000/25);
    }

    won() {
        this.winning_sound.play();
    }

    throwObjects() {
        if (this.keyboard.THROW && this.collistions.salsaBottle != 0 && this.throwBrake()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collistions.salsaBottle--;
            this.collistions.salsaPrecent -= 20;
            this.level.statusBar[2].setPercentage(this.collistions.salsaPrecent)
            this.lastThrow = new Date().getTime();
            this.character.idleEnd();
        }
    }

    throwBrake() {
        let timePassed = new Date().getTime() - this.lastThrow; // Differenc in ms
        return timePassed >= 200;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ---------- space for fixd objects ------------! 
        this.addObjectsToMap(this.level.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins)
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {// draw() wird immer wieder aufgerufen.
            self.draw();
        });
    }

    addObjectsToMap(ojects) {
        ojects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
    }

    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // object um seine eingene berite verscheiben (damit kein sprung enstehent)
        this.ctx.scale(-1, 1);// 180° spiegelung
        mo.x = mo.x * -1;// x kordiante spiegeln damit in die richtige richtung gelaufen wird.
    }

    flipImgBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();// reset damit alles andere nicht spiegel verkehrt ist!! 
    }


}