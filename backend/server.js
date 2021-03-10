const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const { createRoomName } = require('./utils');
const { initGameState, question } = require('./game');

/* Globals */
const clientRoom = {};
const state = {};

io.on('connection', client => {
    client.on('createNewRoom', handleCreateNewRoom);
    client.on('joinRoom', handleJoinRoom);

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
            client.emit('unKnownCode');
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

    }


})

function generateQuestion(room) {
    state[room].questions = question();
    console.log(state[room].questions);
}

httpServer.listen(process.env.PORT || 3000);