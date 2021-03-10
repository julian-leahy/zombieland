const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const { createRoomName } = require('./utils');
const { initGameState } = require('./game');

/* Globals */
const clientRoom = {};
const state = {};

io.on('connection', client => {
    client.on('createNewRoom', handlecreateNewRoom);

    function handlecreateNewRoom() {
        const room = createRoomName(5);
        clientRoom[client.id] = room;
        client.emit('getGameCode', room);

        // set initial state
        state[room] = initGameState();

        client.join(room);
        client.number = 1;
        client.emit('setPlayer', 1);
    }
})

httpServer.listen(process.env.PORT || 3000);