import { showHide } from "./utils.js";
import questionInput from "./questions.js";

const socket = io('http://localhost:3000');

socket.on('getGameCode', displayGameCode);
socket.on('setPlayer', setPlayerNumber);
socket.on('unknownCode', unknownCode);
socket.on('tooManyPlayers', tooManyPlayers);
socket.on('displayQuestion', displayQuestion);
socket.on('questionResults', questionResults);

/**** sections for show or hide ****/
const createJoinSection = document.querySelector('#createJoinSection');
const selectedPlayerSection = document.querySelector('#selectedPlayerSection');
const gamePageSelection = document.querySelector('#gamePageSelection');

/**** show players image and game code ****/
const playerProfile = document.querySelector('#playerProfile');
const gameCodeInput = document.querySelector('#gameCodeInput');

/**** players input to question ****/
const userInput = document.querySelector('#userInput');


/**** buttons ****/
const createGameBtn = document.querySelector('#createGameBtn');
const joinGameBtn = document.querySelector('#joinGameBtn');

createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);
gameCodeInput.addEventListener('keyup', function(e) {
    e.code === 'Enter' && gameCodeInput.value ? joinGame() : false;
})

/**** globals ****/
let playerNumber;
let submitted = true;

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
    initialiseNewGame(2);
    document.querySelector('#getReady').innerText = 'Get Ready!';
}

function initialiseNewGame(player) {
    showHide(selectedPlayerSection, createJoinSection);

    const playersImage = (player == 1) ? './images/boy-selected.png' : './images/girl-selected.png';
    playerProfile.style.backgroundImage = `url('${playersImage}')`;
}

function setPlayerNumber(player) {
    playerNumber = player;
}

function displayQuestion(state, isNewGame) {
    if (isNewGame) showHide(gamePageSelection, selectedPlayerSection);
    questionInput(JSON.parse(state));
    userInput.focus();
}

function questionResults(args) {

}

userInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' && userInput.value && submitted) {
        submitted = false;
        userInput.style.backgroundColor = '#ffa500';
        const answer = { id: playerNumber, input: userInput.value };
        socket.emit('playerInput', JSON.stringify(answer));
    }
})

// TODO
function unknownCode(args) {
    showHide(createJoinSection, selectedPlayerSection);
    console.log('Unknown code')
}

// TODO
function tooManyPlayers(args) {
    showHide(createJoinSection, selectedPlayerSection);
    console.log('Too many players')
}