import { showHide } from "./utils.js";

const socket = io('http://localhost:3000');

socket.on('getGameCode', displayGameCode);
socket.on('setPlayer', setPlayerNumber);
socket.on('unknownCode', unknownCode);
socket.on('tooManyPlayers', tooManyPlayers);



/**** sections for show or hide ****/
const createJoinSection = document.querySelector('#createJoinSection');
const selectedPlayerSection = document.querySelector('#selectedPlayerSection');
/**** show players image ****/
const playerProfile = document.querySelector('#playerProfile');
/**** get game code ****/
const gameCodeInput = document.querySelector('#gameCodeInput');

/**** buttons ****/
const createGameBtn = document.querySelector('#createGameBtn');
const joinGameBtn = document.querySelector('#joinGameBtn');

createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);

/**** globals ****/
let playerNumber;

function createGame() {
    socket.emit('createNewRoom');
    initialiseNewGame(1);
}

function displayGameCode(gameCode) {
    document.querySelector('#gameCodeText').innerHTML = `Game Code: <span>${gameCode}</span>`;
}

function joinGame() {
    const codeEntered = gameCodeInput.value;
    if (codeEntered == '') return;
    socket.emit('joinRoom', codeEntered);
}

function initialiseNewGame(player) {
    showHide(selectedPlayerSection, createJoinSection);

    const playersImage = (player == 1) ? './images/boy-selected.png' : './images/girl-selected.png';
    playerProfile.style.backgroundImage = `url('${playersImage}')`;
}

function setPlayerNumber(player) {
    playerNumber = player;
}

// TODO
function unknownCode(args) {
    console.log('Unknown code')
}

// TODO
function tooManyPlayers(args) {
    console.log('Too many players')
}