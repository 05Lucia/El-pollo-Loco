class ThrowableObject extends MovebaleObject {
    speedY = 30;
    height = 100;
    width = 80;

    constructor(x,y) {
        super().loadeImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.applyGravity();
        setInterval(() => {
            this.x += 12;
        }, 25);
    }
}