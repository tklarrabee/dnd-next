const db = require('../models');

module.exports = app => {

    app.post('/'), (req, res) => {
        console.log('create game request', req.body)
        const {session, name} = req.body
        
        db.Game.create().then((game, err) => {
            if (err) res.json(err)
            else db.User.create({session: session, name: name, game: game.id }).then((user, err) => {
                if (err) res.json(err)
                else {
                    const gameAndUser = {
                        user: user,
                        game: game
                    }
                    res.json(gameAndUser)
                }
            })
        })
    }

}