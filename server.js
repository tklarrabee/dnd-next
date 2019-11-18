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
    console.log('a user has connected');
});

server.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});