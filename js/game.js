let canvas;
let world;
// let keyboard = new Keyboard();
let gameEndInterval;

function InitiateGame() { // a onclick function.
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    intLevel1();
    world = new World(canvas, new Keyboard());
    checkForGameEnd();
}

function checkForGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnde === true) {
             document.getElementById('restart').classList.remove('d-none');
             clearInterval(world.backgroundSound);
             world.background_sound.pause();
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