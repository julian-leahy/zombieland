const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const { createRoomName } = require('./utils');

/* Globals */
const clientRoom = {};
const state = {};

io.on('connection', client => {
    client.on('createNewRoom', handlecreateNewRoom);

    function handlecreateNewRoom() {
        const room = createRoomName(5);
        clientRoom[client.id] = room;
        client.emit('getGameCode', room);
    }
})

httpServer.listen(process.env.PORT || 3000);