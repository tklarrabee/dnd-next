module.exports = function (sequelize, Sequelize) {
    var user_alert = sequelize.define('user_alert', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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
        user_alert.hasMany(models.user_alert, {
            foreignKey: {
                allowNull: false
            }
        })
    }


    return user_alert
}