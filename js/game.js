let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

document.addEventListener('keydown', (event) => {
    console.log(event);
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (event.code == "KeyW" || event.code == "ArrowUp") {
        keyboard.UP = true;
    }

    if (event.code == "KeyS" || event.code == "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (event.code == "Space") {
        keyboard.SPACE = true;
    }

    if (event.code === "KeyF" || event.code =="ShiftLeft") {
        keyboard.THROW = true;
    }
});

document.addEventListener('keyup', (event) => {
    console.log(event);
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (event.code == "KeyW" || event.code == "ArrowUp") {
        keyboard.UP = false;
    }

    if (event.code == "KeyS" || event.code == "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (event.code == "Space") {
        keyboard.SPACE = false;
    }

    if (event.code === "KeyF" || event.code =="ShiftLeft") {
        keyboard.THROW = false;
    }
});