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
        db.Game.create({ status: "stop" }).then((game, err) => {
            // res.json(game)
            console.log("GAME ID ----> " + game.id)

            if (!err) {
                db.User.create({ session: req.sessionID, name: name, GameId: game.id }).then((user, err) => {
                    if (err) res.json(err)
                    else {
                        const gameAndUser = {
                            user: user,
                            game: game
                        }
                        res.json(gameAndUser)
                    }
                })
            }
            else res.json(err)
        })

    })


    app.post('/user', (req, res) => {
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

}





