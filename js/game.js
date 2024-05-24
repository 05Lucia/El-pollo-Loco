let canvas;
let world;
let keyboard = new Keyboard();
let gameEndInterval;

function InitiateGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    intLevel1();
    world = new World(canvas, keyboard);
    checkForGameEnd();
}

function checkForGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnde === true) {
             document.getElementById('restart').classList.remove('d-none');
        }
    }, 1000 / 60);
}

function reset() {
    world = null;
    level1 = null;
    document.getElementById('restart').classList.add('d-none');
    canvas.classList.add('d-none');
    clearInterval (gameEndInterval);
    document.getElementById('start-screen').classList.remove('d-none');
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