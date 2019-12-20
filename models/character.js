module.exports = function (sequelize, Sequelize) {
    var Character = sequelize.define('Character', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
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
        }
    })
    Character.associate = function (models) {
        Character.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
            }
        })
    }


    Character.associate = function (models) {
        Character.hasMany(models.user_alert, {
            foreignKey: {
                allowNull: false
            }
        })
    }


    return Character
}