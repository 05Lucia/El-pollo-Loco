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
    winning_sound = new Audio('./audio/winning.mp3')
    losing_sound = new Audio('audio/lost.mp3')
    backgroundSound;
    keepChecking;
    animationRequest;
    gameOver = false;
    endScreen = 0;
    gameEnde = false;

    /**
   * Creates a new World instance.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element to use for rendering.
   * @param {Keyboard} keyboard - The keyboard object for handling player input.
   */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.constantRepeat();
    }

    /**
   * Initializes references between the world and its components (character, collisions).
   */
    setWorld() {
        this.character.world = this;
        this.collistions.world = this;
    }

    /**
   * Starts a repeating loop for core game logic updates.
   *
   * - Checks for collisions.
   * - Throws salsa bottles based on player input and cooldowns.
   * - Checks for game over condition.
   * - Manages background music playback.
   */
    constantRepeat() {
        this.keepChecking = setInterval(() => {
            this.collistions.checkCollisions();
            this.throwObjects();
            this.lost();
            this.backgroundMusic();
        }, 1000 / 60);
    }

    /**
   * Plays or pauses the background music based on the global `music` variable.
   */
    backgroundMusic() {
        if (music) {
            this.background_sound.volume = 0.07;
            this.background_sound.play();
        } else if (!music) {
            this.background_sound.pause();
        }

    }

    /**
   * Called when the game is won.
   *
   * - Plays the winning sound.
   * - Creates a new end screen object.
   * - Ends the game.
   */
    won() {
        if (music) {
            this.winning_sound.play();
        }
        this.endScreen = new EndScreen('./img/9_intro_outro_screens/win/won_2.png')
        this.gameEnded();
    }

    /**
  * Called when the game is lost.
  *
  * - Plays the losing sound.
  * - Creates a new end screen object.
  * - Ends the game.
  */
    lost() {
        if (this.gameOver === true) {
            if (music) {
                this.losing_sound.play();
            }
            this.endScreen = new EndScreen('./img/9_intro_outro_screens/game_over/game over.png')
            this.gameEnded();
        }
    }

    /**
   * Stops the game loop and animations when the game ends.
   * - Clears the `keepChecking` interval.
   * - Cancels the `animationRequest` after a short delay (500ms).
   * - Sets `gameEnde` to true to indicate game ended state.
   */
    gameEnded() {
        clearInterval(this.keepChecking);
        setTimeout(() => {
            cancelAnimationFrame(this.animationRequest);
        }, 500);
        this.gameEnde = true;
    }

    /**
   * Throws a salsa bottle if certain conditions are met.
   * - Checks for keyboard throw key press, sufficient salsa bottles, and a throw time brake.
   * - Creates a new `ThrowableObject` instance and adds it to the world.
   * - Decrements salsa bottle count and percentage.
   * - Updates the status bar with the new salsa percentage.
   * - Sets the last throw time for the throw brake.
   * - Calls `character.idleEnd()` to handle character animation.
   */
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

    /**
   * Checks if enough time has passed since the last throw to allow another throw.
   * - Calculates the time difference between the current time and the last throw time.
   * - Returns true if at least 200 milliseconds have passed.
   */
    throwBrake() {
        let timePassed = new Date().getTime() - this.lastThrow;
        return timePassed >= 200;
    }

    /**
   * The main game loop function responsible for drawing and updating the game world.
   * - Clears the canvas.
   * - Applies camera translation.
   * - Draws movable objects on screen.
   * - Draws static objects on screen.
   * - Cancels camera translation.
   * - Calls `drawAnimation` to request another animation frame.
   */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.movableObjectsOnScreen();
        this.staticObjectsOnScreen();
        this.ctx.translate(-this.camera_x, 0);
        this.drawAnimation();
    }

    /**
   * Draws all movable objects currently within the viewport.
   * - Calls `addObjectsToMap` for various object categories (background, clouds, etc.).
   */
    movableObjectsOnScreen() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins)
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
   * Draws all static objects on screen.
   * - Applies camera translation (negative) before drawing status bar and end screen.
   * - Cancels camera translation afterwards.
   */
    staticObjectsOnScreen() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.statusBar);
        if (this.endScreen != 0) {
            this.addToMap(this.endScreen);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    /**
   * Requests an animation frame for the next draw cycle.
   * - Schedules a callback function (`draw`) to be called by the browser for the next animation frame.
   */
    drawAnimation() {
        let self = this;
        this.animationRequest = requestAnimationFrame(function () {// draw() wird immer wieder aufgerufen.
            self.draw();
        });
    }

    /**
   * Helper function to add a collection of objects to the map (presumably for drawing).
   * - Iterates over each object in the collection and calls `addToMap` on it.
   */
    addObjectsToMap(ojects) {
        ojects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
   * Draws a single object on the game canvas.
   * - Flips the object's image if the `otherDirection` flag is set.
   * - Calls the object's `draw` method to render it on the canvas.
   * - Flips the image back if previously flipped.
   * 
   @param {DrawableObject} mo - The moveble object to be drawn.
   */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImgBack(mo);
        }
    }

    /**
   * Flips the object's image horizontally on the canvas by manipulating the context.
   * - Saves the current canvas state.
   * - Translates the context by the object's width.
   * - Scales the context horizontally by -1 (mirroring).
   * - Mirrors the object's x-coordinate for correct positioning.
   * 
   @param {DrawableObject} mo - The moveble object to be flipped.
   */
    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // object um seine eingene berite verscheiben (damit kein sprung enstehent)
        this.ctx.scale(-1, 1);// 180° spiegelung
        mo.x = mo.x * -1;// x kordiante spiegeln damit in die richtige richtung gelaufen wird.
    }

    /**
   * Resets the image flipping applied in `flipImg` and restores the original state.
   * - Multiplies the object's x-coordinate by -1 to undo mirroring.
   * - Restores the canvas context to its previous state before flipping.
   * 
   @param {DrawableObject} mo - The moveble object that was flipped.
   */
    flipImgBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();// reset damit alles andere nicht spiegel verkehrt ist!! 
    }

}