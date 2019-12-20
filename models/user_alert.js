module.exports = function (sequelize, Sequelize) {
    var user_alert = sequelize.define('user_alert', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    })

    user_alert.associate = function (models) {
        user_alert.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    user_alert.associate = function (models) {
        user_alert.belongsTo(models.Character, {
            foreignKey: {
                allowNull: false
            }
        })
    }


    return user_alert
}