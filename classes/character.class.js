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
    IMG_IDLE_LONG = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'

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
    IMG_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMG_GAMEOVER = [
        './img/9_intro_outro_screens/game_over/game over.png'
    ]
    world;
    startIdle = 0;
    running_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3')

    /**
   * Loads the default idle image for the character.
   */
    constructor() {
        super().loadeImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadeImages(this.IMG_WALKING);
        this.loadeImages(this.IMG_JUMPING);
        this.loadeImages(this.IMG_IDLE);
        this.loadeImages(this.IMG_IDLE_LONG);
        this.loadeImages(this.IMG_DEAD);
        this.loadeImages(this.IMG_HURT);
        this.loadeImages(this.IMG_GAMEOVER);
        this.applyGravity(130);
        this.idleStart();
    }

    /**
   * Records the start time for the idle animation.
   */
    idleStart() {
        this.startIdle = new Date().getTime();
    }

    /**
   * Calculates if the character has been idle for more than 3 seconds.
   * True if the character has been idle for more than 3 seconds, false otherwise.
   * @returns {boolean}  
   */
    idleTime() {
        let idleTime = new Date().getTime() - this.startIdle;
        idleTime = idleTime / 1000;
        return idleTime >= 3;
    }

    /**
   * Starts an interval that plays the long idle animation when certain conditions are met (not jumping, on ground, not moving).
   * The interval ID for the long idle animation (private property)
   * @type {number}
   */
    idelAnimation = setInterval(() => {
        if (!(this.isAboveGround(130)) && this.idleTime() && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMG_IDLE_LONG);
        } if (!(this.isAboveGround(130)) && (!(this.idleTime()) || this.startIdle === 0) && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMG_IDLE);
            if (this.startIdle === 0) {
                this.idleStart();
            }
        }
    }, 500);

    /**
   * Resets the idle start time.
   */
    idleEnd() {
        this.startIdle = 0;
    }

    /**
   * Starts an interval that checks the character's state and plays the corresponding animation (dead, hurt, jumping, running, idle).
   * The interval ID for the main animation loop (private property).
   * @type {number} 
   */
    animation = setInterval(() => {
        this.running_sound.pause();
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.hurtAnimation();
        } else if (this.isAboveGround()) {
            this.jumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.runningAnimation()
        }
    }, 100)

    /**
   * Plays the death animation and sets the game to over state.
   */
    deadAnimation() {
        this.world.gameOver = true;
        this.playAnimation(this.IMG_DEAD);
    }

    /**
   * Plays the hurt animation and resets the idle timer.
   */
    hurtAnimation() {
        this.idleEnd();
        this.playAnimation(this.IMG_HURT);
    }

    /**
   * Plays the jump animation and stops the running sound.
   */
    jumpAnimation() {
        this.idleEnd();
        this.running_sound.pause();
        this.playAnimation(this.IMG_JUMPING); // Jumping Animation
    }

    /**
   * Plays the running animation and starts the running sound.
   */
    runningAnimation() {
        this.idleEnd();
        this.playAnimation(this.IMG_WALKING);//walking animation
        if (music) {
          this.running_sound.play();  
        }
    }

    /**
   * Starts an interval that handles character movement based on keyboard input and jumping.
   * The interval ID for movement and jump handling (private property)
   * @type {number} 
   */
    enableMovment = setInterval(() => {
        this.enableWalking();
        if (this.world.keyboard.SPACE && !this.isAboveGround(130)) {
            this.idleEnd();
            this.jump();
            this.jumpingSound();
        }
    }, 1000 / 60);

    /**
   * Plays the jump sound effect with adjusted volume.
   */
    jumpingSound() {
        if (music) {
          this.jumping_sound.play();  
        }
        this.jumping_sound.volume = 0.3;
    }

    /**
   * Handles character movement to the left or right based on keyboard input and keeps the camera centered.
   */
    enableWalking() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.idleEnd();
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > -600) {
            this.idleEnd();
            this.moveLeft(this.speed);
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x + 90;
    }

    /**
   * Sets the character's vertical speed for jumping.
   */
    jump() {
        this.speedY = 30;
    }
}