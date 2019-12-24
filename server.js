const express = require("express");
const session = require('express-session')
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const uuid = require('node-uuid');

// const game = require('./routes/game');
const PORT = process.env.PORT || 3001;




app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(session({
    genid: req => {
        return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    },
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })) 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.post('/game'), (req, res) => {
    console.log('fuck is going on', req.body)
}

// ============= Database =================

const models = require('./models')

// Require API routes
require('./routes/game')(app)


models.sequelize.sync({ force: true }).then(function () {
    console.log(`\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷\n●○▷ Database is Online! ●○▷\n●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷●○▷`)
}).catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!')
});

io.on('connection', (socket) => {
    // 
    console.log('a user has connected. ID: ' + socket.id);
    
    // Socket 'create game' will create a room named after game id from mysql.
    // emits creating game/game created
    // socket.on create game needs to grab a session Id from express-session
    
    socket.on('create game', game => {
        console.log("Room Created: " + game)
        socket.join(game)
        socket.emit('broadcast', 'Game Created')
        gameData.room = game
        gameData.id = socket.id
        // console.log("user joined room: "+room)
    });
    
    socket.on('player join', player => {
        console.log(player)
        socket.broadcast.in(player.room).emit('player join', 'broadcasting because character added')
        console.log('broadcasting to room: ' + player.room)
    });
    
    // This will be the start of an encounter, 
    // figure out serverside and client side timer. 
    socket.on('play', play => {
        console.log('custom emit works')
    });
    
    // socket needs to emit a disconnection notificaiton to group
    
    socket.on('disconnect', socket => {
        console.log('a user has disconnected')
    });
    
    
});



server.listen(PORT, err => {
    if (!err) { console.log(`🌎 ==> API server now on port ${PORT}!`); }
});
