module.exports = function (sequelize, Sequelize) {
    var Character = sequelize.define('Character', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        initiative: {
            type: Sequelize.INTEGER
        },

        order: {
            type: Sequelize.INTEGER,
        },

        npc: {
            type: Sequelize.BOOLEAN,
            notEmpty: true,
            default: false
        },
        char_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    Character.associate = function (models) {
        Character.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
            }
        })

        Character.hasMany(models.user_alert, {
            foreignKey: {
                allowNull: false
            }
        })
    }


    return Character
}