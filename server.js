const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const path = require("path");
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

io.on('connection', (socket) => {
    // 
    console.log('a user has connected. ID: '+socket.id);

    const gameData = {
        player: "",
        id: "",
        room: "",
        gm: false,
        characters: []
    }

    
    
    socket.on('create game', game => {
        console.log("Room Created: " + game.room)
        socket.join(socket.id)
        socket.emit('broadcast', 'Game Created')
        gameData.room = game.room
        gameData.id = socket.id
        // console.log("user joined room: "+room)
    });

    socket.on('player join', player => {
        console.log(player)
        socket.broadcast.in(player.room).emit('player join', 'broadcasting because character added')
        console.log('broadcasting to room: '+ player.room)
    });

    socket.on('play', play => {
        console.log('custom emit works')
    });

    socket.on('disconnect', (socket) => {
        console.log('a user has disconnected')
    });


});



server.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});