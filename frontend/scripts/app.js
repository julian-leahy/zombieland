import { showHide } from "./utils.js";

const socket = io('http://localhost:3000');

/**** sections for show or hide ****/
const createJoinSection = document.querySelector('#createJoinSection');
const selectedPlayerSection = document.querySelector('#selectedPlayerSection');
/**** show players image ****/
const playerProfile = document.querySelector('#playerProfile');


/**** buttons ****/
const createGameBtn = document.querySelector('#createGameBtn');
const joinGameBtn = document.querySelector('#joinGameBtn');

createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);


function createGame() {
    console.log('Create new game');
    initialiseNewGame(1);
}

function joinGame() {
    console.log('Join Game');
}

function initialiseNewGame(player) {
    showHide(selectedPlayerSection, createJoinSection);

    const playersImage = (player == 1) ? './images/boy-selected.png' : './images/girl-selected.png';
    playerProfile.style.backgroundImage = `url('${playersImage}')`

}