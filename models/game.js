module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('game', {
  
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      game_id: {
        type: Sequelize.STRING,
        notEmpty: true
      },
  
      lastname: {
        type: Sequelize.STRING,
        notEmpty: true
      },
  
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
  
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    User.associate = function (models) {
      User.hasMany(models.Tasks, {
        onDelete: 'cascade'
      })
    }
  
    return User
  }
  