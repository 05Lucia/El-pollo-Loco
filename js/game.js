let canvas;
let world;
let gameEndInterval;
let music = true;

/**
 * Starts the game when the button is clicked.
 *
 * - Hides the start screen.
 * - Initializes a new World object.
 * - Starts checking for game end condition.
 * - Hides the help bar.
 */
function InitiateGame() { 
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    intLevel1();
    world = new World(canvas, new Keyboard());
    checkForGameEnd();
    document.getElementById('help-bar').classList.add('d-none')
}

/**
 * Starts an interval to check if the game has ended.
 *
 * - If the world's `gameEnde` property is true (game ended),
 *   - shows the restart button.
 *   - clears the game's background sound interval.
 *   - pauses the game's background sound.
 */
function checkForGameEnd() {
    gameEndInterval = setInterval(() => {
        if (world.gameEnde === true) {
            document.getElementById('restart').classList.remove('d-none');
            clearInterval(world.backgroundSound);
            world.background_sound.pause();
        }
    }, 1000 / 60);
}

/**
 * Resets the game state when the button is clicked.
 *
 * - Clears references to world and level objects.
 * - Hides the restart button.
 * - Hides the canvas element.
 * - Clears the game end check interval.
 * - Shows the start screen.
 */
function reset() { 
    world = null;
    level1 = null;
    document.getElementById('restart').classList.add('d-none');
    canvas.classList.add('d-none');
    clearInterval(gameEndInterval);
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * Toggles music on/off based on the current music state.
 *
 * - Updates the music button image based on the music state.
 * - Sets the `music` variable (presumably controls music playback).
 */
function toggleMusic() {
    const musicBtn = document.getElementById('audio-btn');
    if (music) {
        musicBtn.src = './img/icons/music_off.svg';
        music = false;
    }else {
        musicBtn.src = './img/icons/music_note.svg';
        music = true;
    }
}

/**
 * Toggles fullscreen mode for the game container.
 *
 * - If not in fullscreen, requests fullscreen mode for the game container.
 *   - Hides the info and help bar elements.
 * - If already in fullscreen, exits fullscreen mode.
 *   - Shows the info element.
 */
function fullscreen() {// a onclick function.
    const gameContainer = document.getElementById('game-arrea')
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen(); 
        document.getElementById('info').classList.add('d-none');
        document.getElementById('help-bar').classList.add('d-none')
    } else {
        document.exitFullscreen();
        document.getElementById('info').classList.remove('d-none');
    }
}

/**
 * Toggles the visibility of the help bar.
 */
function info() {// a onclick function.
    let info = document.getElementById('help-bar')
    
    if (!info.classList.contains('d-none')) {
        info.classList.add('d-none')
    } else {
        info.classList.remove('d-none')
    }
}