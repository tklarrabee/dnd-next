const db = require("../models");



// const router = express.Router();
/*

    const game = {
        session: "butts",
        name: "butts"
    }

*/
module.exports = app => {

    app.post('/game', function (req, res) {
        console.log('create game request', req.sessionID)
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

}





