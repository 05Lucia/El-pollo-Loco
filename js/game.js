let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (event) => {
    if (event.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.code == "Space") {
        keyboard.SPACE = true;
    }

    if (event.code === "KeyF") {
        keyboard.THROW = true;
    }
});

document.addEventListener('keypress', (event) => {})

document.addEventListener('keyup', (event) => {
    if (event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    
    if (event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.code == "Space") {
        keyboard.SPACE = false;
    }

    if (event.code === "KeyF") {
        keyboard.THROW = false;
    }
});