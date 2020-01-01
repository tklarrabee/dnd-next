const db = require("../models");

module.exports = (app, io) => {
    
    const gameState = {
        countdown: 0,
        interval: 0,
        room: "",
        status: "stop"
    }

    // if (timer.countdown > 0 && room && status === 'play') {
        
    // }

    timerStart = async (countdown, interval, room) => {
        let promise = new Promise((resolve, reject) => {
            setTimeout( () => {
                yourTurn(room, countdown)
                resolve('resolved')
            } , countdown)
        })

        await promise 
        setTimeout( yourTurn(room, interval), interval)
    }
    
    yourTurn = (room, count) => {
        io.in(room).emit('timer', {countdown: count}) 
    }
    
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

        // emits creating game/game created
        // socket.on create game needs to grab a session Id from express-session
        // Need a session Id 


        socket.on('player join', game => {
            db.Game.findAll({
                where: {
                    id: game.room
                }
            }).then(foundGame => {
                if (foundGame.length > 0) {
                    db.User.findAll({
                        where: {
                            GameId: game.room,
                            session: game.session
                        }
                    }).then(user => {
                        if (user.length > 0) {
                            socket.join(game.room)
                            console.log("User joining: " + game.room)
                        }
                        else {
                            db.User.create({ session: game.session, GameId: game.room, name: "Wittle Baby" }).then(user => {
                                console.log("User Created")
                                socket.join(game.room)
                            })
                        }
                        io.in(game.room).emit('player join', 'PLAYER JOINED ROOM, BIOTCH')
                    })
                }
                else {
                    socket.emit('no game', 'this game does not exist')
                }
            }).catch( err => {throw err})

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
        socket.on('change', play => {
            const { status, interval } = play
            switch(status) {
                case 'play':
                    if(interval > 0) {
                        
                        setTimeout(setInterval(setInterval(yourTurn(gameState), 1000), countdown), countdown)
                        setInterval(setInterval(yourTurn(gameState), 1000), interval)
                        
                    } else {
                        console.log("If there is no interval, sort")
                        socket.emit('start', 'sort and start')
                    }
                    break;
                case 'pause':
                    if(interval > 0)
                    break;
                default: gameState.status = 'stop'
            }
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
            // console.log(req.sessionID)
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