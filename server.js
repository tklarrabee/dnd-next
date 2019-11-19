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

    
    
    socket.on('room', room => {
        console.log("Room Created: " + room)
        socket.join(room)
        socket.emit('broadcast', 'Some Asshole Joined')
        // console.log("user joined room: "+room)

    });

    socket.on('add character', character => {
        console.log(character)
        socket.in(character.room).emit('broadcast', 'broadcasting because character added')
        console.log('broadcasting to room: '+ character.room)
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