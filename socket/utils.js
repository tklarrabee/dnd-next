const db = require("../models");

module.exports = (app, io) => {

    app.post('/game', function (req, res) {
        console.log('create game db call', req.sessionID)
        const { name } = req.body

        // This was surprisingly difficult to fix
        db.Game.create({ status: "stop" }).then((game) => {
            // res.json(game)
            console.log("GAME ID ----> " + game.id)

           
                db.User.create({ session: req.sessionID, name: name, GameId: game.id }).then((user) => {
                    
                        const gameAndUser = {
                            user: user,
                            game: game
                    }
                        res.json(gameAndUser)
                    
                }).catch(err => {
                    throw err
                })
            
            
        })

    })

    io.on('connection', (socket) => {
        // ================ SOCKET EVENT LISTENERS ===============
        console.log('a user has connected. ID: ' + socket.id);
        
        // Socket 'create game' will create a room named after game id from mysql.
        // emits creating game/game created
        // socket.on create game needs to grab a session Id from express-session
        
        socket.on('create game', game => {
            // console.log("Room Created: " + game)
            socket.join(game)
            socket.room = game;
            socket.emit('game created', game);
            console.log("user created game: "+ socket.room)
        });
        
        socket.on('player join', room => {
            console.log("attempting to join game: " + room)
            socket.join(room)
            // socket.emit('player join', 'PLAYER JOINED ROOM, BIOTCH')
            io.in(room).emit('player join', 'PLAYER JOINED ROOM, BIOTCH')
        });

        socket.on('add character', newChar => {
            console.log(newChar)
            db.Character.findAll({where: {GameId: newChar.gameId}}).then( characters => {
                socket.to(newChar.gameId).emit('new character', characters)
            })
        })
        
        // This will be the start of an encounter, 
        // figure out serverside and client side timer. 
        socket.on('play', play => {
            console.log('custom emit works')
        });
        
        // socket needs to emit a disconnection notificaiton to group
        
        socket.on('disconnect', socket => {
            console.log('a user has disconnected')
        });

        // ================= onConnect API ROUTES ======================
        

    
    
        app.post('/user', function (req, res) {
            // console.log("verifying user")
            console.log(req.sessionID)
            const { GameId } = req.body
            db.User.findAll({
                where: {
                    GameId: GameId,
                    session: req.sessionID
                }
            }).then((user) => {
                res.json(user)
            })
    
        })
    
        app.get('/session', (req, res) => {
            res.json(req.sessionID)
        })
        
    });
}