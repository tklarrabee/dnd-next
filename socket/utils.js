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

    app.get('/session', (req, res) => {
        console.log(req.sessionID)
        res.json(req.sessionID)
    })

    io.on('connection', (socket) => {
        // ================ SOCKET EVENT LISTENERS ===============
        console.log('a user has connected. ID: ' + socket.id);

        // Socket 'create game' will create a room named after game id from mysql.
        // emits creating game/game created
        // socket.on create game needs to grab a session Id from express-session
        // Need a session Id 

        socket.on('create game', game => {
            // console.log("Room Created: " + game)
            socket.join(game)
            socket.room = game;
            socket.emit('game created', game);
            console.log("user created game: " + socket.room)
        });

        socket.on('player join', game => {
            console.log("User joining: " + game.room)
            socket.join(game.room)
            db.Game.findAll({
                where: {
                    id: game.room
                }
            }).then(game => {
                if (game.length > 0) {
                    db.User.findAll({
                        where: {
                            GameId: game.room,
                            session: game.session
                        }
                    }).then(user => {
                        if (user.length > 0) {
                            console.log("FUCK YEAH, THIS USER EXISTS", user.length)
                        }
                        else {
                            db.User.create({ session: game.session, GameId: game.room, name: "Wittle Baby" }).then(user => {
                                console.log("User Created")
                            })
                        }
                    })
                }
                else {
                    socket.emit('no game', 'this game does not exist')
                }
            })
            io.in(game.room).emit('player join', 'PLAYER JOINED ROOM, BIOTCH')

            // socket.emit('player join', 'PLAYER JOINED ROOM, BIOTCH')
            // socket.emit('game data', )
        });

        socket.on('add character', newChar => {
            console.log(newChar)
            db.Character.findAll({ where: { GameId: newChar.gameId } }).then(characters => {
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


        // Get all characters for the session
        // 


        app.get('/character', (req, res) => {
            // console.log("verifying user")
            console.log(req.sessionID)
            const { GameId } = req.body
            db.User.findAll({
                where: {
                    GameId: GameId,
                    session: req.sessionID
                }
            }).then((user) => {
                if (user) {
                    db.Character.findAll({
                        where: {
                            GameId: GameId
                        },
                        include: [
                            {
                                model: user_alert,
                                where: {
                                    watch: true
                                },
                                required: false
                            }
                        ]
                    })
                }
            })

        })



    });
}