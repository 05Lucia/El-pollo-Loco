class ThrowableObject extends MovebaleObject {
    speedY = 30;
    height = 100;
    width = 80;
    IMG_TROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMG_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    spalsh;
    activ = true;
    throwing_sound = new Audio('./audio/throw.mp3');
    splashing_sound = new Audio('./audio/splash.mp3');
    

    constructor(x, y) {
        super().loadeImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadeImages(this.IMG_TROW);
        this.loadeImages(this.IMG_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.applyGravity(370);
        this.throwing_sound.play();
    }

    throwforward = setInterval(() => {
        if (this.isAboveGround(370)) {
            this.x += 12;
        } else {
            this.x += 0;
            this.salsaHit();
            setTimeout(() => {
                clearInterval(this.spalsh);
            }, 1000);
        }
    }, 25);

    animateTrow = setInterval(() => {
        this.playAnimation(this.IMG_TROW);
    }, 1000 / 25);

    salsaHit() {
        this.splashing_sound.volume = 0.5;
        this.splashing_sound.play();
        this.activ = false;
        this.x += 0;
        clearInterval(this.animateTrow);
        clearInterval (this.throwforward);
        this.spalsh = setInterval(() => {
            this.playAnimation(this.IMG_SPLASH);
        }, 200);
    }
}