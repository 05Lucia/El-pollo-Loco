class World {
    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0)

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

    flipImgBack(mo){
        mo.x = mo.x * -1;
            this.ctx.restore();// reset damit alles andere nicht spiegel verkehrt ist!! 
    }
}