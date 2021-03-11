import { showHide } from "./utils.js";
import questionInput from "./questions.js";
import { killBoth, killPlayer1, killPlayer2, respawn } from "./animations.js";
import updateLeaderBoard from "./leaderboard.js";
import { gameOverPlayer1, gameOverPlayer2 } from "./gameover.js";

let server;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    server = 'http://localhost:3000'
} else {
    server = 'https://glacial-reaches-95195.herokuapp.com/'
}
const socket = io(server);

socket.on('getGameCode', displayGameCode);
socket.on('setPlayer', setPlayerNumber);
socket.on('unknownCode', unknownCode);
socket.on('tooManyPlayers', tooManyPlayers);
socket.on('displayQuestion', displayQuestion);
socket.on('questionResults', questionResults);
socket.on('gameOver', handleGameOver);

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
const nextQuestionBtn = document.querySelector('#nextQuestionBtn');

createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);
nextQuestionBtn.addEventListener('click', nextQuestion);
gameCodeInput.addEventListener('keyup', function(e) {
    e.code === 'Enter' && gameCodeInput.value ? joinGame() : false;
})

/**** globals ****/
let playerNumber;
let canSubmit = true;

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
    nextQuestionBtn.classList.add('hidden');
    respawn();
    canSubmit = true;
    userInput.readOnly = false;
    if (isNewGame) showHide(gamePageSelection, selectedPlayerSection);
    questionInput(JSON.parse(state));
    userInput.focus();
}

function questionResults(winner, playersObj, gameOver) {
    const players = JSON.parse(playersObj);
    if (winner == 0) killBoth();
    if (winner == 1) killPlayer2();
    if (winner == 2) killPlayer1();
    updateLeaderBoard(winner, players, gameOver);
}

function nextQuestion() {
    nextQuestionBtn.classList.add('hidden');
    socket.emit('nextQuestion');
}

function handleGameOver(playersObj) {
    const players = JSON.parse(playersObj);
    if (players[0].lives == 0)
        gameOverPlayer1();
    if (players[1].lives == 0)
        gameOverPlayer2();
}

userInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' && userInput.value && canSubmit) {
        console.log('oh fuck')
        canSubmit = false;
        userInput.readOnly = true;
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