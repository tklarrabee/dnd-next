module.exports = (sequelize, Sequelize) => {
  var Game = sequelize.define('Game', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // status values roll, pause, stop, and play
    status: {
      type: Sequelize.STRING
    }
  })

  Game.associate = function (models) {
    Game.hasMany(models.User, {
      onDelete: 'cascade'
    })

    Game.hasMany(models.Character, {
      onDelete: 'cascade'
    }) 
  }


  return Game
}
