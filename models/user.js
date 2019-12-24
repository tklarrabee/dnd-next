module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        session: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    
    User.associate = function (models) {
        User.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
            }
        })

        User.hasMany(models.user_alert, {
            onDelete: 'cascade'
        })
    }

    // User.associate = function (models) {
    //     User.hasMany(models.user_alert, {
    //         onDelete: 'cascade'
    //     })
    // }

    return User
}