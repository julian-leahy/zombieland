import { hide, showHide } from "./utils.js";
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
socket.on('displayOptions', displayOptions);
socket.on('displayQuestion', displayQuestion);
socket.on('questionResults', questionResults);
socket.on('gameOver', handleGameOver);

/**** sections for show or hide ****/
const createJoinSection = document.querySelector('#createJoinSection');
const selectedPlayerSection = document.querySelector('#selectedPlayerSection');
const gamePageSelection = document.querySelector('#gamePageSelection');
const optionScreenSelection = document.querySelector('#optionScreenSelection');

/**** show players image and game code ****/
const playerProfile = document.querySelector('#playerProfile');
const gameCodeInput = document.querySelector('#gameCodeInput');

/**** players input to question ****/
const userInput = document.querySelector('#userInput');
const tombstoneReset = document.querySelector('.tombstone');

/**** buttons ****/
const createGameBtn = document.querySelector('#createGameBtn');
const joinGameBtn = document.querySelector('#joinGameBtn');
const nextQuestionBtn = document.querySelector('#nextQuestionBtn');
const startGameBtn = document.querySelector('#startGameBtn');


createGameBtn.addEventListener('click', createGame);
joinGameBtn.addEventListener('click', joinGame);
startGameBtn.addEventListener('click', startGame);

nextQuestionBtn.addEventListener('click', nextQuestion);
gameCodeInput.addEventListener('keyup', function(e) {
    e.code === 'Enter' && gameCodeInput.value ? joinGame() : false;
})

/**** globals ****/
let playerNumber;
let canSubmit;

function createGame() {
    if (gameCodeInput.value) return;
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
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(i => {
        i.checked = true;
    })
}

function initialiseNewGame(player) {
    showHide(selectedPlayerSection, createJoinSection);
    const playersImage = (player == 1) ? './images/boy-selected.png' : './images/girl-selected.png';
    playerProfile.style.backgroundImage = `url('${playersImage}')`;
    canSubmit = true;
}

function setPlayerNumber(player) {
    playerNumber = player;
}

function displayOptions(args) {
    showHide(optionScreenSelection, selectedPlayerSection);
}

function startGame() {
    const options = [];
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    checkboxes.forEach(i => {
        options.push(i.value)
    });

    socket.emit('newGame', options);
}

function displayQuestion(state, isNewGame) {
    tombstoneReset.classList.remove('riseup');
    nextQuestionBtn.classList.add('hidden');
    hide(selectedPlayerSection);
    respawn();
    canSubmit = true;
    userInput.readOnly = false;
    if (isNewGame) showHide(gamePageSelection, optionScreenSelection);
    questionInput(JSON.parse(state));
    userInput.focus();
}

function questionResults(winner, stateObj, gameOver) {
    const state = JSON.parse(stateObj);
    if (winner == 0) killBoth();
    if (winner == 1) killPlayer2();
    if (winner == 2) killPlayer1();
    updateLeaderBoard(winner, state, gameOver);
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