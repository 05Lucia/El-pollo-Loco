let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

document.addEventListener('keydown', (event) => {
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.code == "Space") {
        keyboard.SPACE = true;
    }

    if (event.code === "KeyF" || event.code =="ShiftLeft") {
        keyboard.THROW = true;
    }
});

document.addEventListener('keypress', (event) => {})

document.addEventListener('keyup', (event) => {
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.code == "Space") {
        keyboard.SPACE = false;
    }

    if (event.code === "KeyF" || event.code =="ShiftLeft") {
        keyboard.THROW = false;
    }
});