module.exports = (sequelize, Sequelize) => {
    var Game = sequelize.define('game', {
  
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // status values roll, pause, stop, and play
      status: {
        type: Sequelize.STRING,
        default: 'inactive'
      }
    })
  
    Game.associate = models => {
      Game.hasMany(models.User, {
        onDelete: 'cascade'
      })
    }

    Game.associate = models => {
      Game.hasMany(modesl.Character, {
        onDelete: 'cascade'
      })
    }
  
    return Game
  }
  