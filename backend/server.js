const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const { createRoomName } = require('./utils');
const { initGameState, question, checkAnswers, updateLives } = require('./game');

/* Globals */
const clientRoom = {};
const state = {};
let playerCount = 0;

io.on('connection', client => {
    client.on('createNewRoom', handleCreateNewRoom);
    client.on('joinRoom', handleJoinRoom);
    client.on('playerInput', handlePlayerInput);

    function handleCreateNewRoom() {
        const room = createRoomName(5);
        clientRoom[client.id] = room;
        client.emit('getGameCode', room);

        // set initial state
        state[room] = initGameState();

        client.join(room);
        client.number = 1;
        client.emit('setPlayer', 1);
    }

    function handleJoinRoom(room) {
        let numClients;

        if (io.sockets.adapter.rooms.get(room)) {
            numClients = io.sockets.adapter.rooms.get(room).size;
        }

        if (numClients === 0 || !numClients) {
            client.emit('unknownCode');
            return;
        } else if (numClients > 1) {
            client.emit('tooManyPlayers');
            return;
        }

        clientRoom[client.id] = room;
        client.join(room);
        client.number = 2;
        client.emit('setPlayer', 2);

        generateQuestion(room);
        emitAllDisplayQuestion(room, true);
    }

    function handlePlayerInput(playerInput) {
        const playerAnswer = JSON.parse(playerInput);
        const room = clientRoom[client.id];
        const players = state[room].players;
        const correctAnswer = state[room].question.answer;

        /* Record timestamp with players input */
        players[playerAnswer.id - 1].time = Date.now();
        players[playerAnswer.id - 1].answer = playerAnswer.input;
        playerCount += 1;

        /* Wait for both players to answer */
        if (playerCount == 2) {
            playerCount = 0;
            const winner = checkAnswers(players, correctAnswer); // 1,2 or 0 if both wrong
            const gameOver = updateLives(players, winner);
            emitAllResults(room, winner);
        }

    }

})

function generateQuestion(room) {
    state[room].question = question();
}

function emitAllDisplayQuestion(room, newGame) {
    setTimeout(() => {
        io.sockets.in(room)
            .emit('displayQuestion', JSON.stringify(state[room].question), newGame);
    }, 3000);
}

function emitAllResults(room, winner) {
    io.sockets.in(room)
        .emit('questionResults', winner, JSON.stringify(state[room].players));
}

httpServer.listen(process.env.PORT || 3000);