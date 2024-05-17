class Character extends MovebaleObject {
    y = 130;
    height = 330;
    width = 160;
    speed = 10;

    IMG_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMG_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMG_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMG_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    running_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3')

    constructor() {
        super().loadeImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadeImages(this.IMG_WALKING);
        this.loadeImages(this.IMG_JUMPING);
        this.loadeImages(this.IMG_IDLE);
        this.loadeImages(this.IMG_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.idelAnimation();
        this.enableMovment();
        this.jumpingAnimation();
        this.walkingAnimation();
        this.deadAnimation();
    }

    deadAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMG_DEAD);
            }
        }, 300);
    }

    idelAnimation() {
        setInterval(() => {
            if (!(this.isAboveGround()) && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMG_IDLE);
            }
        }, 500);
    }

    jumpingAnimation() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.running_sound.pause();
                this.playAnimation(this.IMG_JUMPING); // Jumping Animation
            }
        }, 90);
    }

    walkingAnimation() {
        setInterval(() => {
            if (!(this.isAboveGround())) {
                this.running_sound.pause();
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMG_WALKING);//walking animation
                    this.running_sound.play();
                }
            }
        }, 60);

    }

    enableMovment() {
        setInterval(() => {
            this.enableWalking();

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumpingSound();
            }
        }, 1000 / 60);
    }

    jumpingSound() {
        this.jumping_sound.play();
        this.jumping_sound.volume = 0.3;
    }

    enableWalking() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > -600) {
            this.moveLeft();
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x + 100;
    }

    jump() {
        this.speedY = 30;
    }

}