class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    THROW = false;

    /**
   * Creates a new keyboard instance and sets up event listeners for key presses and touches.
   */
    constructor() {
        this.buttonPressEvent();
        this.keyPressEvent();
    }

    /**
   * Attaches event listeners for touch start/end events on directional and action buttons.
   */
    buttonPressEvent() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        document.getElementById('throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.THROW = true;
        });

        document.getElementById('throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW = false;
        });
    }

    /**
   * Attaches event listeners for key down/up events on keyboard keys.
   */
    keyPressEvent() {
        document.addEventListener('keydown', (event) => {
            if (event.code == "ArrowRight") {
                this.RIGHT = true;
            }

            if (event.code == "ArrowLeft") {
                this.LEFT = true;
            }

            if (event.code == "Space") {
                this.SPACE = true;
            }

            if (event.code === "KeyF") {
                this.THROW = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code == "ArrowRight") {
                this.RIGHT = false;
            }

            if (event.code == "ArrowLeft") {
                this.LEFT = false;
            }

            if (event.code == "Space") {
                this.SPACE = false;
            }

            if (event.code === "KeyF") {
                this.THROW = false;
            }
        });
    }
}